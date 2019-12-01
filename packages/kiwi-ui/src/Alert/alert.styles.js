import { colorEmphasis } from '../utils'

export const statuses = {
  info: { icon: 'info', color: 'blue' },
  warning: { icon: 'warning-2', color: 'orange' },
  success: { icon: 'check-circle', color: 'green' },
  error: { icon: 'warning', color: 'red' }
}

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  pl: 4,
  pr: 4,
  pt: 3,
  pb: 3
}

/**
 * @description Create leftAccent alert styles
 * @param {Object} props
 * @property {String} color
 */
const leftAccent = props => {
  const { color } = props
  return {
    light: {
      pl: 3,
      ...subtle(props).light,
      borderLeft: '4px',
      borderColor: `${color}.500`
    },
    dark: {
      pl: 3,
      ...subtle(props).dark,
      borderLeft: '4px',
      borderColor: `${color}.200`
    }
  }
}

/**
 * @description Create topAccent alert styles
 * @param {Object} props
 * @property {String} color
 */
const topAccent = props => {
  const { color } = props
  return {
    light: {
      pt: 2,
      ...subtle(props).light,
      borderTop: '4px',
      borderColor: `${color}.500`
    },
    dark: {
      pt: 2,
      ...subtle(props).dark,
      borderTop: '4px',
      borderColor: `${color}.200`
    }
  }
}

/**
 * @description Create solid alert styles
 * @param {Object} props
 * @property {String} color
 */
const solid = ({ color }) => {
  return {
    light: { bg: `${color}.500`, color: 'white' },
    dark: { bg: `${color}.200`, color: 'gray.900' }
  }
}

/**
 * @description Create subtle alert styles
 * @param {Object} props
 * @property {String} color
 */
const subtle = ({ color, theme: { colors } }) => {
  let darkBg = colors[color] && colors[color][200]
  return {
    light: {
      bg: `${color}.100`
    },
    dark: { bg: colorEmphasis(darkBg, 'lowest') }
  }
}

/**
 * @description Evaluate variant styles
 * @param {Object} props
 * @returns {Object} Style props
 */
const statusStyleProps = props => {
  switch (props.variant) {
    case 'solid':
      return solid(props)
    case 'subtle':
      return subtle(props)
    case 'topAccent':
      return topAccent(props)
    case 'leftAccent':
      return leftAccent(props)
    default:
      return {}
  }
}

/**
 * @description Create styles for alert component
 * @param {Object} context
 * @property {String} variant
 * @property {String} color
 * @property {String} colorMode
 * @property {Object} theme
 * @returns {Object} Style props
 */
const useAlertStyle = ({ variant, color, colorMode, theme }) => {
  const _props = { variant, color, theme }
  return {
    ...baseProps,
    ...statusStyleProps(_props)[colorMode]
  }
}

/**
 * @description Create alert icon styles
 * @param {Object} context
 * @property {String} variant
 * @property {String} colorMode
 * @property {String} color
 * @returns {Object} Style props
 */
export const useAlertIconStyle = ({ variant, colorMode, color }) => {
  if (['left-accent', 'top-accent', 'subtle'].includes(variant)) {
    let result = {
      light: { color: `${color}.500` },
      dark: { color: `${color}.200` }
    }

    return result[colorMode]
  }
}

export default useAlertStyle
