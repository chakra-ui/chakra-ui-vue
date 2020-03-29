const iconSizes = {
  xs: {
    w: '0.75rem',
    h: '0.75rem'
  },
  sm: {
    w: '0.8rem',
    h: '0.8rem'
  },
  md: {
    w: '1.0rem',
    h: '1.0rem'
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

/**
 * @description Evaluates button icon sizes and returns wight and height parameters
 * @param {Object} props
 */
export const setButtonIconSize = (props) => {
  return iconSizes[props.size] || createCustomSize(props.size)
}
