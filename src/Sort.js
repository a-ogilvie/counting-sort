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
   * Sort this.array using the counting sort algorithm and visualise.
   * @param {HTMLElement} arrayElem
   * @param {HTMLElement} objectElem
   */
  sort(arrayElem, objectElem) {
    const arrayValues = { a: "foo", b: "bar" };
    Object.defineProperty(arrayValues, "toString", {
      value: function stringObject() {
        return Object.entries(this);
      },
      enumerable: false,
    });
    console.log(arrayValues.toString());
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

  /**
   * Generate an HTML element from the provided item.
   * @param {*} item
   * @returns {HTMLElement}
   */
  generateNewElem(item) {
    const container = document.createElement("div");
    const textNode = document.createTextNode();
    container.appendChild(textNode);
    return container;
  }

  createCheesyTitle(slogan) {
    const container = document.createElement("h1");
    const textNode = document.createTextNode(slogan);
    container.appendChild(textNode);
    return container;
  }
}

module.exports = CountingSort;
