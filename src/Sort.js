/** Class which can sort an array using the counting sort algorithm. */
class CountingSort {
  /**
   * Initialise with an array
   * @param {Array} array
   */
  constructor(array) {
    this.array = array;
  }

  /** Sort this.array using the counting sort algorithm. */
  sort() {
    // Generate an empty object
    const arrayValues = {};
    // Add 1 to each value in the new object with key equal to the index of the numbers
    // And find the largest value in the array
    let maxValue = 0;
    this.array.forEach((value) => {
      if (maxValue < value) maxValue = value;
      if (!arrayValues.hasOwnProperty(value)) {
        arrayValues[value] = 1;
      } else {
        arrayValues[value]++;
      }
    });
    // Refill the original array from smallest to largest value
    const result = [];
    for (let i = 0; i <= maxValue; i++) {
      while (arrayValues[i] && arrayValues[i] > 0) {
        result.push(i);
        arrayValues[i]--;
      }
    }
    this.array = result;
  }

  /**
   * Immediately returns the value with which it is provided.
   * @param {*} value
   * @returns {*} value
   */
  returnValue(value) {
    return value;
  }
}

module.exports = CountingSort;
