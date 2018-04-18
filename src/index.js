// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

const ARRAYSIZE = 30;
const unsortedTable = document.getElementById("array");

const unsortedArray = [];

// Generate unsortedArray and display on page
for (let i = 0; i < ARRAYSIZE; i++) {
  const randomNumber = Math.floor(Math.random() * 30);
  unsortedArray.push(randomNumber);
  const tableData = document.createElement("div");
  tableData.textContent = randomNumber;
  tableData.className = "unsorted-item";
  unsortedTable.appendChild(tableData);
}

const sort = new Sort(unsortedArray);
const counts = sort.sort();
