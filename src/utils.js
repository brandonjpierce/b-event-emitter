/**
 * Determines if passed in value is a function
 *
 * @method isFunction
 *
 * @param {Mixed} val Value we want to check
 *
 * @return {Boolean} Whether the value is a function
 */
export function isFunction(val) {
  return Object.prototype.toString.call(val) === '[object Function]';
}

/**
 * Taken from io.js source. ~1.5x faster than Array.splice()
 *
 * @method spliceOne
 *
 * @param {Array} list The array we want to splice
 * @param {String|Number} index Index we want to splice at
 *
 * @return {Array} Mutated array
 */
export function spliceOne(list, index) {
  for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  
  list.pop();
}
