// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

// SETUP

const MAXVALUE = 30;

// User-configurable animation settings
let delay = 500;
let arraySize = 15;

// Page elements
const unsortedTable = document.getElementById("unsorted-array");
const countingTable = document.getElementById("counting-array");
const sortedTable = document.getElementById("sorted-array");
const speedSelector = document.querySelector('#controls [name="speed"]');
const arraySizeSelector = document.querySelector(
  '#controls [name="array-size"]'
);
const startButton = document.querySelector('#controls [name="start"]');
const stopButton = document.querySelector('#controls [name="stop"]');

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
  j: 0,
  counterValue: null,
};

let isAnimationRunning = false;

// Event Listeners
speedSelector.addEventListener("change", changeSpeed);
arraySizeSelector.addEventListener("change", () => {
  arraySize = Math.round(Number(arraySizeSelector.value));
  stopAnimation();
  generatePageLayout();
  if (isAnimationRunning) {
    startAnimation();
    countingId = setTimeout(animateCountingArray, delay);
  }
});
startButton.addEventListener("click", () => {
  stopAnimation();
  resetCounters();
  isAnimationRunning = true;
  startAnimation();
  countingId = setTimeout(animateCountingArray, delay);
});
stopButton.addEventListener("click", () => {
  stopAnimation();
  isAnimationRunning = false;
});

// Generate empty array placeholders
generatePageLayout();

// FUNCTIONS

function clearPage() {
  while (unsortedTable.firstChild) {
    unsortedTable.firstChild.remove();
  }
  while (countingTable.firstChild) {
    countingTable.firstChild.remove();
  }
  while (sortedTable.firstChild) {
    sortedTable.firstChild.remove();
  }
}

function generatePageLayout() {
  clearPage();

  // Generate unsortedArray placeholder and display
  for (let i = 0; i < arraySize; i++) {
    const tableData = document.createElement("div");
    tableData.className = "unsorted-item";
    unsortedTable.appendChild(tableData);
  }

  generateCountingArray();
  generateSortingArray();
}

function changeSpeed() {
  delay = 2200 - this.value;
}

function generateUnsortedArray() {
  for (let i = 0; i < arraySize; i++) {
    const randomNumber = Math.ceil(Math.random() * MAXVALUE);
    arrayGeneration.unsortedArray.push(randomNumber);
    const tableData = document.createElement("div");
    tableData.textContent = randomNumber;
    tableData.id = `unsorted-item-${i}`;
    tableData.className = "unsorted-item";
    tableData.style.backgroundColor = setBackgroundColor(randomNumber);
    unsortedTable.appendChild(tableData);
  }
}

function generateCountingArray() {
  for (let i = 1; i <= MAXVALUE; i++) {
    const tableContainer = document.createElement("div");
    const tableLabel = document.createElement("div");
    const tableData = document.createElement("div");
    tableLabel.textContent = `${i}`;
    tableLabel.className = "counting-label";
    tableData.id = `counting-item-${i}`;
    tableData.className = "counting-item";
    tableData.textContent = 0;
    tableData.style.backgroundColor = setBackgroundColor(i);
    tableContainer.appendChild(tableLabel);
    tableContainer.appendChild(tableData);
    countingTable.appendChild(tableContainer);
  }
}

function generateSortingArray() {
  for (let i = 0; i < arraySize; i++) {
    const tableData = document.createElement("div");
    tableData.id = `sorted-item-${i}`;
    tableData.className = "sorted-item";
    sortedTable.appendChild(tableData);
  }
}

function setBackgroundColor(i) {
  // Colour hex values for items
  const colours = {
    red: "#FF4242",
    orange: "#FCA22D",
    yellow: "#E2E539",
    green: "#3BF994",
    blue: "#3B84F9",
    purple: "#DD3BF9",
  };

  if (i <= 5) return colours.red;
  else if (i <= 10) return colours.orange;
  else if (i <= 15) return colours.yellow;
  else if (i <= 20) return colours.green;
  else if (i <= 25) return colours.blue;
  else return colours.purple;
}

function startAnimation() {
  clearPage();

  arrayGeneration.unsortedArray = [];
  generateUnsortedArray();
  generateCountingArray();
  generateSortingArray();

  arrayGeneration.sort = new Sort(arrayGeneration.unsortedArray);
  arrayGeneration.counts = arrayGeneration.sort.sort();
}

function animateCountingArray() {
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
    sortingId = setTimeout(animateSortedArray, delay);
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
  countingId = setTimeout(animateCountingArray, delay);
}

function animateSortedArray() {
  // Stop animating when we reach the end
  if (counters.j >= arrayGeneration.counts.length) {
    clearTimeout(sortingId);
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
    isAnimationRunning = false;
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
  sortedItem.style.backgroundColor = setBackgroundColor(
    arrayGeneration.counts[counters.j][0]
  );
  counters.i++;
  counters.counterValue--;
  if (counters.counterValue === 0) {
    // Reset counterValue and move to next cell in counting array
    counters.j++;
    counters.counterValue--;
  }
  sortingId = setTimeout(animateSortedArray, delay);
}

function stopAnimation() {
  clearTimeout(countingId);
  clearTimeout(sortingId);
}

function resetCounters() {
  counters.i = 0;
  counters.j = 0;
  counters.counterValue = null;
}
