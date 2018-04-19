// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

const ARRAYSIZE = 30;
const MAXVALUE = 30;
const unsortedTable = document.getElementById("unsorted-array");
const countingTable = document.getElementById("counting-array");
const sortedTable = document.getElementById("sorted-array");

const unsortedArray = [];

// Generate unsortedArray and display vis on page
for (let i = 0; i < ARRAYSIZE; i++) {
  const randomNumber = Math.floor(Math.random() * MAXVALUE);
  unsortedArray.push(randomNumber);
  const tableData = document.createElement("div");
  tableData.textContent = randomNumber;
  tableData.id = `unsorted-item-${i}`;
  tableData.className = "unsorted-item";
  unsortedTable.appendChild(tableData);
}

// Generate empty counting array vis
for (let i = 0; i < MAXVALUE; i++) {
  const tableData = document.createElement("div");
  tableData.id = `counting-item-${i}`;
  tableData.className = "counting-item";
  tableData.textContent = 0;
  countingTable.appendChild(tableData);
}

// Generate empty sortedArray vis
for (let i = 0; i < ARRAYSIZE; i++) {
  const tableData = document.createElement("div");
  tableData.id = `sorted-item-${i}`;
  tableData.className = "sorted-item";
  sortedTable.appendChild(tableData);
}

const sort = new Sort(unsortedArray);
const counts = sort.sort();

console.log({ counts });

const DELAY = 500;
let i = 0;

function generateCountingArray() {
  // Stop animating when we reach the end
  if (i >= ARRAYSIZE) {
    clearInterval(countingInterval);
  }
  // Remove the selected class from the previous iteration
  if (i > 0) {
    const previousArrayItem = document.getElementById(`unsorted-item-${i - 1}`);
    const previousCountItem = document.getElementById(
      `counting-item-${unsortedArray[i - 1]}`
    );
    previousArrayItem.classList.remove("selected");
    previousCountItem.classList.remove("selected");
  }
  // Reset the counter and start the next animation
  if (i === ARRAYSIZE) {
    i = 0;
    sortingInterval = setInterval(generateSortedArray, DELAY);
    return;
  }
  // Add selected class and insert correct number
  const arrayItem = document.getElementById(`unsorted-item-${i}`);
  const countItem = document.getElementById(
    `counting-item-${unsortedArray[i]}`
  );
  arrayItem.classList.add("selected");
  countItem.classList.add("selected");
  countItem.textContent = Number(countItem.textContent) + 1;

  // Advance index counter
  i++;
}

let counterValue = null;
let j = 0;

function generateSortedArray() {
  // Stop animating when we reach the end
  if (j >= counts.length) {
    clearInterval(sortingInterval);
  }
  // Clear selected class from previous iteration
  if (i > 0) {
    const previousSortedItem = document.getElementById(`sorted-item-${i - 1}`);
    const previousCountingItem = document.getElementById(
      `counting-item-${counts[j - 1][0]}`
    );
    previousSortedItem.classList.remove("selected");
    previousCountingItem.classList.remove("selected");
  }
  // Finish here when we reach the end
  if (i === ARRAYSIZE) {
    i = 0;
    return;
  }
  // Animate!
  const sortedItem = document.getElementById(`sorted-item-${i}`);
  const countingItem = document.getElementById(`counting-item-${counts[j][0]}`);
  // Keep track of counter value while iterating
  if (counterValue === null) {
    counterValue = counts[j][1];
  }
  countingItem.classList.add("selected");
  sortedItem.classList.add("selected");
  sortedItem.textContent = counts[j][0];
  i++;
  counterValue--;
  if (counterValue === 0) {
    // Reset counterValue and move to next cell in counting array
    j++;
    counterValue = null;
  }
}

let countingInterval = setInterval(generateCountingArray, DELAY);
let sortingInterval;
