/**
 * Conforms a value to provided precision
 * @param {Value} value Value
 * @param {Number} step step
 * @returns {Number} Precise value
 */
function makeValuePrecise (value, step) {
  const stepDecimalPart = step.toString().split('.')[1]
  const stepPrecision = stepDecimalPart ? stepDecimalPart.length : 0
  return Number(value.toFixed(stepPrecision))
}

/**
 * Rounds off a value to the nearest step
 * @param {Number} value Value
 * @param {Number} step step
 * @returns {Number} rounded value
 */
export function roundValueToStep (value, step) {
  return makeValuePrecise(Math.round(value / step) * step, step)
}

/**
 * Clamps provided value within domain
 * @param {Number} val Value
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns {Number} clamped value
 */
export function clampValue (val, min, max) {
  if (val > max) {
    return max
  }
  if (val < min) {
    return min
  }
  return val
}
