import { propsConfig as config } from '../config/props'

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
