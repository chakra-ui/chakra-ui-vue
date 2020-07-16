import { config } from '../config/props'
import { isEmpty } from './object'

/**
 * @description Transforms the custom prop alias to a format that styled-system CSS supports
 * @param {*} prop - Prop
 * @param {*} propValue - Prop value
 * @returns {Object} Style object with transformed alias.
 * @see chakra-ui PseudoBox tx_ method.
 */
function normalizeAlias (prop, propValue) {
  const result = {}
  const entry = config[prop]

  if (entry) {
    const { properties, property } = entry
    if (properties) {
      for (const _cssProp in properties) {
        result[_cssProp] = propValue
      }
    }
    if (property) {
      result[property] = propValue
    }
    if (entry === true) {
      result[prop] = propValue
    }
  } else {
    result[prop] = propValue
  }
  return result
}

/**
 * @description Transforms the alias prop object to style-system supported syntax
 * @param {Object} props - Props object
 * @returns {Object} Normalized Props object
 */
export const transformAlias = (props) => {
  let result = {}
  if (!props || isEmpty(props)) {
    return result
  }

  for (const prop in props) {
    if (typeof props[prop] === 'object') {
      result = { ...result, [prop]: transformAlias(props[prop]) }
    } else {
      result = { ...result, ...normalizeAlias(prop, props[prop]) }
    }
  }

  return result
}

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
