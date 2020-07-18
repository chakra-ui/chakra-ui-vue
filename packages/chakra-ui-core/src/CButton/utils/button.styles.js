import { addOpacity } from '../../utils'

const baseStyles = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  lineHeight: '1.2',
  outline: 'none'
}

const disabledProps = {
  _disabled: {
    opacity: '40%',
    cursor: 'not-allowed',
    boxShadow: 'none'
  }
}

const buttonSizes = {
  xs: {
    w: '0.75rem',
    h: '0.75rem'
  },
  sm: {
    w: '1rem',
    h: '1rem'
  },
  md: {
    w: '1.5rem',
    h: '1.5rem'
  },
  lg: {
    w: '2rem',
    h: '2rem'
  },
  xl: {
    w: '3rem',
    h: '3rem'
  }
}

const createCustomSize = (size) => {
  return {
    w: size,
    h: size
  }
}

const unstyledStyle = {
  userSelect: 'inherit',
  bg: 'none',
  border: 0,
  color: 'inherit',
  display: 'inline',
  font: 'inherit',
  lineHeight: 'inherit',
  m: 0,
  p: 0,
  textAlign: 'inherit'
}

/**
 * @description Evaluates button icon sizes and returns wight and height parameters
 * @param {Object} props
 */
export const setIconSizes = (props) => {
  return buttonSizes[props.size] || createCustomSize(props.size)
}

/**
 * Size values
 */
const sizes = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: 'lg',
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2
  }
}

/**
 * @description Determines size props
 * @param {Object} param0 Props object
 * @returns {Object} Size style props
 */
const sizeProps = ({ size }) => sizes[size]

const graySolidStyle = {
  light: {
    bg: 'gray.100',
    _hover: {
      bg: 'gray.200'
    },
    _active: {
      bg: 'gray.300'
    }
  },
  dark: {
    bg: 'whiteAlpha.200',
    _hover: {
      bg: 'whiteAlpha.300'
    },
    _active: {
      bg: 'whiteAlpha.400'
    }
  }
}

/**
 * @description Get solid button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getSolidStyles = ({ color, colorMode }) => {
  let style = {
    light: {
      bg: `${color}.400`,
      color: 'white',
      _hover: {
        bg: `${color}.500`
      },
      _active: {
        bg: `${color}.600`
      }
    },
    dark: {
      bg: `${color}.200`,
      color: 'gray.800',
      _hover: {
        bg: `${color}.300`
      },
      _active: {
        bg: `${color}.400`
      }
    }
  }

  if (color === 'gray') {
    style = graySolidStyle
  }
  return style[colorMode]
}

/**
 * @description Get ghost button style values
 * @param {Object} props - Style Props
 * @returns {Object} - Ghost styles object
 */
const getGhostStyles = ({ color, colorMode, theme }) => {
  const _color = theme.colors[color] && theme.colors[color][200]
  const result = {
    light: {
      color: `${color}.500`,
      bg: 'transparent',
      _hover: {
        bg: `${color}.50`
      },
      _active: {
        bg: `${color}.100`
      }
    },
    dark: {
      color: `${color}.200`,
      bg: 'transparent',
      _hover: {
        bg: addOpacity(_color, 0.12)
      },
      _active: {
        bg: addOpacity(_color, 0.24)
      }
    }
  }
  return result[colorMode]
}

/**
 * @description Get flat button style values
 * @param {Object} props - Style Props
 * @returns {Object} - Ghost styles object
 */
const getFlatStyles = ({ color, colorMode, theme }) => {
  const _color = theme.colors[color] && theme.colors[color][200]
  const result = {
    light: {
      color: `${color}.400`,
      bg: 'transparent',
      _hover: {
        bg: `${color}.50`
      },
      _active: {
        bg: `${color}.100`
      }
    },
    dark: {
      color: `${color}.200`,
      bg: 'transparent',
      _hover: {
        bg: addOpacity(_color, 0.12)
      },
      _active: {
        bg: addOpacity(_color, 0.24)
      }
    }
  }
  return result[colorMode]
}

/**
 * @description Get outline button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getOutlineStyles = (props) => {
  const { color, colorMode } = props
  const borderColor = { light: 'gray.200', dark: 'whiteAlpha.300' }

  return {
    border: '1px',
    borderColor: color === 'gray' ? borderColor[colorMode] : 'current',
    ...getFlatStyles(props)
  }
}

/**
 * @description Get link button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getLinkStyles = ({ color, colorMode }) => {
  const _color = { light: `${color}.400`, dark: `${color}.200` }
  const _activeColor = { light: `${color}.700`, dark: `${color}.500` }
  return {
    p: 0,
    height: 'auto',
    lineHeight: 'normal',
    color: _color[colorMode],
    _hover: {
      textDecoration: 'underline'
    },
    _active: {
      color: _activeColor[colorMode]
    }
  }
}

/**
 * @description Determines styles for a given v
 * @param {Object} props - Props Object
 * @returns {Object} - Variant styles object
 */
const getVariantStyles = (props) => {
  switch (props.variant) {
    case 'solid':
      return getSolidStyles(props)
    case 'outline':
      return getOutlineStyles(props)
    case 'ghost':
      return getGhostStyles(props)
    case 'flat':
      return getFlatStyles(props)
    case 'link':
      return getLinkStyles(props)
    case 'unstyled':
      return unstyledStyle
    default:
      return graySolidStyle
  }
}

/**
 * Button focus styles
 */
const focusStyles = {
  _focus: {
    outline: 'none',
    boxShadow: 'outline'
  }
}

/**
 * @description Generates Button styles based on passed variant props and theme colors.
 * @param {{color: String|Array<String>, theme: Object, colorMode: String, size: String|Array<String>}} props - Style props object
 * @returns {Object} Style object to be passed to styled component
 * @todo Pass the `theme` from the ThemeProvider context. Will need to create a context provider for theme.
 */
const createButtonStyles = (props) => {
  return {
    ...baseStyles,
    ...focusStyles,
    ...sizeProps(props),
    ...getVariantStyles(props),
    ...disabledProps
  }
}

export default createButtonStyles
