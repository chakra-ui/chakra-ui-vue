/**
 * Checks if a value is undefined
 * @param {*} v
 * @returns {Boolean}
 */
export function isUndef (v) {
  return v === undefined || v === null
}

/**
 * Checks if a value is defined
 * @param {*} v
 * @returns {Boolean}
 */
export function isDef (v) {
  return v !== undefined && v !== null
}
