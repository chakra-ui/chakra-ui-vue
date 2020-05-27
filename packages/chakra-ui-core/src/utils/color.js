import Color from 'color'
import { css } from 'emotion'
import { isDef } from './validators'

/**
 * @description Gets color value from theme
 * @param {String} color
 * @param {Number} hue
 * @returns {String} color
 */
export const get = (color, hue) => `${color}.${hue}`

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

/**
 * Generates stripe colors
 * @param {{ size: Number, color: String }} props
 * @returns {String} Class for style strips
 */
export const generateStripe = ({
  size = '1rem',
  color = 'rgba(255, 255, 255, 0.15)'
}) => css({
  backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
  backgroundSize: `${size} ${size}`
})

/**
 * @description Determines whether the provided color is dark or not.
 * @param {String} color
 */
export const isDarkColor = color => Color(color).isDark()

/**
 * Validates variant colors provided by consumer
 * @param {Object} theme Chakra Theme Object
 * @param {String} componentName Component name
 * @param {String} variantColor Variabt color
 */
export function useVariantColorWarning (theme, componentName, variantColor) {
  if (process.env.NODE_ENV === 'production') return
  const variantColorIsDefined = isDef(variantColor)

  if (variantColorIsDefined) {
    const variantColorExists = variantColor in theme.colors
    if (!variantColorExists) {
      console.warn(
        `You passed an invalid variantColor to the ${componentName} Component. Variant color values must be a color key in the theme object that has '100' - '900' color values. Check http://chakra-ui.com/theme#colors to see possible values`
      )
    }
    if (variantColorExists) {
      const colorObj = theme.colors[variantColor]
      const variantColorIsObject = typeof colorObj === 'object' && colorHasAllVariants(colorObj)
      if (!variantColorIsObject) {
        console.warn(
          `${componentName}: The variantColor passed exists in the theme object but is not valid. For a color to be a valid variantColor, it must be an object that has '100' - '900' color values. Use a tool like:
        https://smart-swatch.netlify.com/ to generate color values quickly`
        )
      }
    }
  }
}

/**
 * Checks whether a variant color has all keys from 100 - 900
 * @param {Object} color Color object on theme with all variantes
 * @returns {Boolean}
 */
function colorHasAllVariants (color) {
  const keys = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  return keys.every(key => isDef(color[key]))
}
