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

export const generateAlphas = color => ({
  900: addOpacity(color, 0.92),
  800: addOpacity(color, 0.8),
  700: addOpacity(color, 0.6),
  600: addOpacity(color, 0.48),
  500: addOpacity(color, 0.38),
  400: addOpacity(color, 0.24),
  300: addOpacity(color, 0.16),
  200: addOpacity(color, 0.12),
  100: addOpacity(color, 0.08),
  50: addOpacity(color, 0.04)
})

/**
 * @description Creates emphasis color values for color.
 * @param {String} color
 * @param {String} emphasis
 * @returns {Object} Color alpha hue
 */
export const colorEmphasis = (color, emphasis) => {
  switch (emphasis) {
    case 'high':
      return color
    case 'medium':
      return generateAlphas(color)[700]
    case 'low':
      return generateAlphas(color)[500]
    case 'lowest':
      return generateAlphas(color)[300]
    default:
  }
}
