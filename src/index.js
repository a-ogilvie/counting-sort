// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

const MAXVALUE = 30;
let delay = 1000;
let arraySize = 30;
const unsortedTable = document.getElementById("unsorted-array");
const countingTable = document.getElementById("counting-array");
const sortedTable = document.getElementById("sorted-array");
const speedSelector = document.querySelector('#controls [name="speed"]');
const arraySizeSelector = document.querySelector(
  '#controls [name="array-size"]'
);
const startButton = document.querySelector('#controls [name="start"]');

function changeSpeed() {
  delay = this.value;
}

speedSelector.addEventListener("change", changeSpeed);
startButton.addEventListener("click", () => {
  arraySize = Math.round(Number(arraySizeSelector.value));
  generatePageLayout();
  countingId = setTimeout(generateCountingArray, delay);
});

let unsortedArray;
let sort;
let counts;

function generatePageLayout() {
  while (unsortedTable.firstChild) {
    unsortedTable.firstChild.remove();
  }
  while (countingTable.firstChild) {
    countingTable.firstChild.remove();
  }
  while (sortedTable.firstChild) {
    sortedTable.firstChild.remove();
  }

  unsortedArray = [];
  // Generate unsortedArray and display vis on page
  for (let i = 0; i < arraySize; i++) {
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
  for (let i = 0; i < arraySize; i++) {
    const tableData = document.createElement("div");
    tableData.id = `sorted-item-${i}`;
    tableData.className = "sorted-item";
    sortedTable.appendChild(tableData);
  }

  sort = new Sort(unsortedArray);
  counts = sort.sort();
}

console.log({ counts });

let i = 0;

function generateCountingArray() {
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
  if (i === arraySize) {
    i = 0;
    sortingId = setTimeout(generateSortedArray, delay);
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

  // Advance to next iteration
  countingId = setTimeout(generateCountingArray, delay);
}

let counterValue = null;
let j = 0;

function generateSortedArray() {
  // Stop animating when we reach the end
  if (j >= counts.length) {
    clearInterval(sortingId);
  }
  // Clear selected class from previous iteration
  if (i > 0) {
    const previousSortedItem = document.getElementById(`sorted-item-${i - 1}`);
    previousSortedItem.classList.remove("selected");
  }
  // Finish here when we reach the end
  if (i === arraySize) {
    const previousCountingItem = document.getElementById(
      `counting-item-${counts[j - 1][0]}`
    );
    previousCountingItem.classList.remove("selected");
    i = 0;
    j = 0;
    counterValue = null;
    return;
  }
  // Animate!
  const sortedItem = document.getElementById(`sorted-item-${i}`);
  const countingItem = document.getElementById(`counting-item-${counts[j][0]}`);
  // Remove selected from classList of previous counter array item
  if (counterValue === -1) {
    const previousCountingItem = document.getElementById(
      `counting-item-${counts[j - 1][0]}`
    );
    previousCountingItem.classList.remove("selected");
    counterValue = null;
  }
  // Keep track of counter value while iterating
  if (counterValue === null) {
    counterValue = counts[j][1];
    countingItem.classList.add("selected");
  }
  sortedItem.classList.add("selected");
  sortedItem.textContent = counts[j][0];
  i++;
  counterValue--;
  if (counterValue === 0) {
    // Reset counterValue and move to next cell in counting array
    j++;
    counterValue--;
  }
  sortingId = setTimeout(generateSortedArray, delay);
}

let countingId;
let sortingId;
