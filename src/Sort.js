/** Class which can sort an array of positive integers using the counting sort algorithm. */
class CountingSort {
  /**
   * Initialise with an array
   * @param {Array} array
   */
  constructor(array = []) {
    this.array = array;
  }

  /** Sort this.array using the counting sort algorithm. */
  sort() {
    const arrayValues = {};
    let maxValue = 0;
    this.array.forEach((value) => {
      if (maxValue < value) maxValue = value;
      if (!arrayValues.hasOwnProperty(value)) {
        arrayValues[value] = 1;
      } else {
        arrayValues[value]++;
      }
    });

    const result = [];
    for (let i = 0; i <= maxValue; i++) {
      while (arrayValues[i] && arrayValues[i] > 0) {
        result.push(i);
        arrayValues[i]--;
      }
    }
    this.array = result;
  }
}

module.exports = CountingSort;
