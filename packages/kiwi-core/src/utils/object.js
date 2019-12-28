import { pickBy, mapValues } from 'lodash-es'
import startsWith from 'lodash-es/startsWith'

/**
 * Clears out all undefined properties from an object.
 * @param {Object} props
 * @returns {Object} Sanitized object with defined values.
 */
export function pickProperty (props) {
  const pure = pickBy(props, (prop) => prop !== undefined)
  return pure
}

/**
 * Extracts pseudo style props from props objects
 * @param {Object} props
 * @returns {Object} Pseudo styles object
 */
export function filterPseudo (props) {
  const pseudos = pickBy(props, (_value, key) => {
    return startsWith(key, '_')
  })
  return pseudos
}

/**
 * Unwraps `value` getter values from ref property values in refs object.
 * @param {Object} props
 * @returns {Object} Unwrapped values object
 */
export function unwrapValues (props) {
  return mapValues(props, 'value')
}

/**
 * Check if a given value is a non-null object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a non-null object, else `false`.
 */
export function isNonNullObject (value) {
  return typeof value === 'object' && value !== null
}
