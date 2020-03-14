import { isDarkColor } from '../utils/color'

/**
 * @description Converts a string variable to hex code.
 * @param {String} str
 * @note Found this on ChakraUI and StackOverflow :D
 * @returns {String}
 */
function string2Hex (str) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  let color = '#'
  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

export const avatarSizes = {
  '2xs': 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 'full'
}

/**
 * @description Evaluate style props for avatar
 * @param {{ size: String, name: String, showBorder: Boolean, borderColor: String, theme: Function colorMode: String }} param0
 * @returns {Object} Style props object
 */
export default function useAvatarStyles ({ size, name, showBorder, borderColor, theme, colorMode }) {
  const { colors } = theme

  const bg = name ? string2Hex(name) : colors.gray[400]
  const color = name ? (isDarkColor(bg) ? '#fff' : 'gray.800') : '#fff'
  const _borderColor = { light: '#fff', dark: 'gray.800' }

  const baseProps = {
    display: 'inline-flex',
    rounded: 'full',
    alignItems: 'center',
    flexShrink: '0',
    justifyContent: 'center',
    position: 'relative'
  }

  return {
    ...baseProps,
    w: avatarSizes[size],
    h: avatarSizes[size],
    bg,
    color,
    ...(showBorder && {
      border: '2px',
      borderColor: borderColor || _borderColor[colorMode]
    })
  }
}
