import { css } from '@chakra-ui/styled-system'

/**
 * Build a CSS factory function, to create CSS object by given a theme
 * @param {Object} styleProps Styles object
 * @returns {Function} (theme) => CSSStyleObject
 */
const buildCssFn = (styleProps) => css(styleProps)
export default buildCssFn
