// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

const MAXVALUE = 25;

// User-configurable animation settings
let delay = 500;
let arraySize = 30;

// Page elements
const unsortedTable = document.getElementById("unsorted-array");
const countingTable = document.getElementById("counting-array");
const sortedTable = document.getElementById("sorted-array");
const speedSelector = document.querySelector('#controls [name="speed"]');
const arraySizeSelector = document.querySelector(
  '#controls [name="array-size"]'
);
const startButton = document.querySelector('#controls [name="start"]');

// TimerIds
let countingId;
let sortingId;

// Array generation variables
const arrayGeneration = {
  unsortedArray: null,
  sort: null,
  counts: null,
};

// Iteration counting variables
const counters = {
  i: 0,
  counterValue: null,
  j: 0,
};

speedSelector.addEventListener("change", changeSpeed);
startButton.addEventListener("click", () => {
  arraySize = Math.round(Number(arraySizeSelector.value));
  generatePageLayout();
  countingId = setTimeout(generateCountingArray, delay);
});

function changeSpeed() {
  delay = 2200 - this.value;
}

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

  arrayGeneration.unsortedArray = [];
  // Generate unsortedArray and display vis on page
  for (let i = 0; i < arraySize; i++) {
    const randomNumber = Math.floor(Math.random() * MAXVALUE);
    arrayGeneration.unsortedArray.push(randomNumber);
    const tableData = document.createElement("div");
    tableData.textContent = randomNumber;
    tableData.id = `unsorted-item-${i}`;
    tableData.className = "unsorted-item";
    unsortedTable.appendChild(tableData);
  }

  // Generate empty counting array vis
  for (let i = 0; i < MAXVALUE; i++) {
    const tableContainer = document.createElement("div");
    const tableLabel = document.createElement("div");
    const tableData = document.createElement("div");
    tableLabel.textContent = `${i}`;
    tableData.id = `counting-item-${i}`;
    tableData.className = "counting-item";
    tableData.textContent = 0;
    tableContainer.appendChild(tableLabel);
    tableContainer.appendChild(tableData);
    countingTable.appendChild(tableContainer);
  }

  // Generate empty sortedArray vis
  for (let i = 0; i < arraySize; i++) {
    const tableData = document.createElement("div");
    tableData.id = `sorted-item-${i}`;
    tableData.className = "sorted-item";
    sortedTable.appendChild(tableData);
  }

  arrayGeneration.sort = new Sort(arrayGeneration.unsortedArray);
  arrayGeneration.counts = arrayGeneration.sort.sort();
}

function generateCountingArray() {
  // Remove the selected class from the previous iteration
  if (counters.i > 0) {
    const previousArrayItem = document.getElementById(
      `unsorted-item-${counters.i - 1}`
    );
    const previousCountItem = document.getElementById(
      `counting-item-${arrayGeneration.unsortedArray[counters.i - 1]}`
    );
    previousArrayItem.classList.remove("selected");
    previousCountItem.classList.remove("selected");
  }
  // Reset the counter and start the next animation
  if (counters.i === arraySize) {
    counters.i = 0;
    sortingId = setTimeout(generateSortedArray, delay);
    return;
  }
  // Add selected class and insert correct number
  const arrayItem = document.getElementById(`unsorted-item-${counters.i}`);
  const countItem = document.getElementById(
    `counting-item-${arrayGeneration.unsortedArray[counters.i]}`
  );
  arrayItem.classList.add("selected");
  countItem.classList.add("selected");
  countItem.textContent = Number(countItem.textContent) + 1;

  // Advance index counter
  counters.i++;

  // Advance to next iteration
  countingId = setTimeout(generateCountingArray, delay);
}

function generateSortedArray() {
  // Stop animating when we reach the end
  if (counters.j >= arrayGeneration.counts.length) {
    clearInterval(sortingId);
  }
  // Clear selected class from previous iteration
  if (counters.i > 0) {
    const previousSortedItem = document.getElementById(
      `sorted-item-${counters.i - 1}`
    );
    previousSortedItem.classList.remove("selected");
  }
  // Finish here when we reach the end
  if (counters.i === arraySize) {
    const previousCountingItem = document.getElementById(
      `counting-item-${arrayGeneration.counts[counters.j - 1][0]}`
    );
    previousCountingItem.classList.remove("selected");
    counters.i = 0;
    counters.j = 0;
    counters.counterValue = null;
    return;
  }
  // Animate!
  const sortedItem = document.getElementById(`sorted-item-${counters.i}`);
  const countingItem = document.getElementById(
    `counting-item-${arrayGeneration.counts[counters.j][0]}`
  );
  // Remove selected from classList of previous counter array item
  if (counters.counterValue === -1) {
    const previousCountingItem = document.getElementById(
      `counting-item-${arrayGeneration.counts[counters.j - 1][0]}`
    );
    previousCountingItem.classList.remove("selected");
    counters.counterValue = null;
  }
  // Keep track of counter value while iterating
  if (counters.counterValue === null) {
    counters.counterValue = arrayGeneration.counts[counters.j][1];
    countingItem.classList.add("selected");
  }
  sortedItem.classList.add("selected");
  sortedItem.textContent = arrayGeneration.counts[counters.j][0];
  counters.i++;
  counters.counterValue--;
  if (counters.counterValue === 0) {
    // Reset counterValue and move to next cell in counting array
    counters.j++;
    counters.counterValue--;
  }
  sortingId = setTimeout(generateSortedArray, delay);
}
