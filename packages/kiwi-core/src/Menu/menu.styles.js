/**
 * Base style props for menu list items
 */
const baseProps = {
  width: 'full',
  flex: ' 0 0 auto',
  userSelect: 'none',
  transition: 'background-color 220ms, color 220ms'
}

/**
 * Gets menu components list styles object
 * @param {String} colorMode Color mode
 * @returns {Object} Styles object
 */
export const useMenuListStyle = (colorMode) => {
  const elevation = {
    light: {
      bg: '#fff',
      shadow: 'sm'
    },
    dark: {
      bg: 'gray.700',
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
    }
  }

  return {
    color: 'inherit',
    borderColor: 'gray.200',
    borderWidth: '1px',
    ...elevation[colorMode]
  }
}

/**
 * Gets interaction style props
 * @param {Object} param0 props
 */
const interactionProps = ({ colorMode }) => {
  const _focusColor = { light: 'gray.100', dark: 'whiteAlpha.100' }
  const _activeColor = { light: 'gray.200', dark: 'whiteAlpha.200' }

  return {
    _active: {
      bg: _activeColor[colorMode]
    },
    _focus: {
      bg: _focusColor[colorMode],
      outline: 0
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
}

/**
 * Gets menu list item styles
 * @param {{theme: Object, colorMode: String }} props Options
 */
export const useMenuItemStyle = ({ theme, colorMode }) => {
  const props = { theme, colorMode }

  return {
    ...baseProps,
    ...interactionProps(props)
  }
}
