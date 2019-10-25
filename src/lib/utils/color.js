// import css from '@styled-system/css'
import Color from 'color'

/**
 * @description Add opacity to a color
 * @param {String} color Hex color code
 * @param {Object} opacity Opacity
 * @returns String
 */
export const addOpacity = (color, opacity) => {
  return Color(color)
    .fade(1 - opacity)
    .string()
}
