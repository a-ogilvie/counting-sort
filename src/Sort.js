/** Class which can sort an array of positive integers using the counting sort algorithm. */
class CountingSort {
  /**
   * Initialise with an array
   * @param {Array} array
   */
  constructor(array = []) {
    this.array = array;
  }

  /**
   * Sort this.array using the counting sort algorithm and return the entries of the counts object.
   * @returns {Array}
   */
  sort() {
    const counts = {};

    let maxValue = 0;
    this.array.forEach((value) => {
      if (maxValue < value) maxValue = value;
      if (!counts.hasOwnProperty(value)) {
        counts[value] = 1;
      } else {
        counts[value]++;
      }
    });

    const result = [];
    for (let i = 0; i <= maxValue; i++) {
      while (counts[i] && counts[i] > 0) {
        result.push(i);
        counts[i]--;
      }
    }
    this.array = result;
    console.log(result);
    return Object.entries(counts);
  }
}

module.exports = CountingSort;
