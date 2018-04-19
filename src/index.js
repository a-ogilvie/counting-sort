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

for (let i = 0; i < ARRAYSIZE; i++) {
  const tableData = document.createElement("div");
  tableData.id = `sorted-item-${i}`;
  tableData.className = "sorted-item";
  sortedTable.appendChild(tableData);
}

const sort = new Sort(unsortedArray);
const counts = sort.sort();

// counts.forEach((count) => {
//   const countItem = document.getElementById(`counting-item-${count[0]}`);
//   countItem.textContent = count[1];
// });

sort.array.forEach((value, index) => {
  const sortedItem = document.getElementById(`sorted-item-${index}`);
  sortedItem.textContent = value;
});

console.log({ counts });

// Loop over first array with consecutive setTimeouts
// each setTimeout also adds to counting array

const DELAY = 500;
let i = 0;

function generateCountingArray() {
  if (i >= ARRAYSIZE) {
    clearInterval(countingInterval);
  }
  if (i > 0) {
    const previousArrayItem = document.getElementById(`unsorted-item-${i - 1}`);
    const previousCountItem = document.getElementById(
      `counting-item-${unsortedArray[i - 1]}`
    );
    previousArrayItem.classList.remove("selected");
    previousCountItem.classList.remove("selected");
    if (i === ARRAYSIZE) return;
  }
  const arrayItem = document.getElementById(`unsorted-item-${i}`);
  const countItem = document.getElementById(
    `counting-item-${unsortedArray[i]}`
  );
  arrayItem.classList.add("selected");
  countItem.classList.add("selected");
  countItem.textContent = Number(countItem.textContent) + 1;

  i++;
}

let countingInterval = setInterval(generateCountingArray, DELAY);

// Use another run of setTimeouts to loop over counting array
// each setTimeout also adds to sorted array

// REMEMBER
// Create a class which adds a highlight to an array cell,
// and add it then remove it again sequentially
