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
  tableData.className = "unsorted-item";
  unsortedTable.appendChild(tableData);
}

// Generate empty counting array vis
for (let i = 0; i < MAXVALUE; i++) {
  const tableData = document.createElement("div");
  tableData.id = `counting-item-${i}`;
  tableData.className = "counting-item";
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

console.log(counts);
