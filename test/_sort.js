const Sort = require("../src/Sort");
const { expect } = require("chai");

describe("Sort", () => {
  it("should be a function", () => {
    expect(Sort).to.be.a("function");
  });

  it("should have a sort method", () => {
    expect(Sort.prototype.sort).to.be.a("function");
  });

  it("should sort an array from lowest value to highest value", () => {
    const unsorted = new Sort([5, 6, 4, 3, 1, 2, 2, 7]);
    const sorted = [1, 2, 2, 3, 4, 5, 6, 7];
    unsorted.sort();
    expect(unsorted.array).to.deep.equal(sorted);
  });
});
