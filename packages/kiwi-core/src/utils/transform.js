import { config } from '../config/props'

/**
 * @description Transforms the custom prop alias to a format that styled-system CSS supports
 * @param {*} prop - Prop
 * @param {*} propValue - Prop value
 * @returns {Object} Style object with transformed alias.
 * @see chakra-ui PseudoBox tx_ method.
 */
function normalizeAlias (prop, propValue) {
  const configKeys = Object.keys(config)
  let result = {}

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop]
    if (properties) {
      properties.forEach(_cssProp => (result[_cssProp] = propValue))
    }
    if (property) {
      result[property] = propValue
    }
    if (config[prop] === true) {
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
export const transformAlias = props => {
  let result = {}
  for (let prop in props) {
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
 * @param {Number} valye Value
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
