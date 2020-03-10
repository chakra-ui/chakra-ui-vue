import { proxyAliases as pxls } from '../config/props/proxy'

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
      result = { ...result, ...pxls({ [prop]: props[prop] }) }
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
