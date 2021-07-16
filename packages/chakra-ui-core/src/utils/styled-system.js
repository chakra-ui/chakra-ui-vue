import { css } from '@chakra-ui/styled-system'

/**
 * Existential getter function that can be used in any style declaration to get a value
 * from theme, with support for fallback values. This helps prevent errors from
 * throwing when a theme value is missing.
 * @param {Object} obj Theme property
 * @param {String} key Theme key
 * @param {String} def Definition if non-existent
 * @param {*} p
 * @param {*} undef
 */
export const __get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key]

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef
  }

  return obj === undef ? def : obj
}

export const composeSystem = (props = {}, theme = {}) =>
  css(props)(theme)
