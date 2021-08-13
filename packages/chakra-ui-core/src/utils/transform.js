/**
 * Converts value to percentage
 * @param {Number} value Value
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns {Number} Percentage value
 */
export function valueToPercent (value, min, max) {
  return ((value - min) * 100) / (max - min)
}

/**
 * Converts percentage to value
 * @param {Number} percent Percentage Value
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns {Number} Numerical value
 */
export function percentToValue (percent, min, max) {
  return (max - min) * percent + min
}
