import { css } from '@chakra-ui/styled-system'

/**
 * Existential getter function that can be used in any style declaration to get a value
 * from theme, with support for fallback values. This helps prevent errors from
 * throwing when a theme value is missing.
 * @param {Object} obj Theme property
 * @param {String} key Theme key
 * @param {String} def Definition if non-existent
 */
export const __get = (obj, key, def) => {
  const keys = key && key.split ? key.split('.') : [key]

  return (
    keys.reduce((res, key) => res && res[key], obj) || def
  )
}

export const composeSystem = (props = {}, theme = {}) => css(props)(theme)
