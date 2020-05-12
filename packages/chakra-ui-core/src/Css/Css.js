import _css from '@styled-system/css'
import { tx } from '../utils'

/**
 * Creates CSS styles and injects them in document
 * from an object of styles and returns a class name
 * @param {Object} styleProps Styles object
 * @returns {String} class name
 */
const Css = styleProps => _css(tx(styleProps))
export default Css
