import { addOpacity, generateAlphas, get } from '../../utils'

const solidStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][500]
  const darkModebackgroundColor = addOpacity(_color, 0.6)
  return {
    light: {
      backgroundColor: get(color, 500),
      color: 'white'
    },
    dark: {
      backgroundColor: darkModebackgroundColor,
      color: 'whiteAlpha.800'
    }
  }
}

const subtleStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][200]
  const alphaColors = generateAlphas(_color)
  const darkModebackgroundColor = alphaColors[300]

  return {
    light: {
      backgroundColor: get(color, 100),
      color: get(color, 800)
    },
    dark: {
      backgroundColor: darkModebackgroundColor,
      color: get(color, 200)
    }
  }
}

const outlineStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][200]
  const darkModeColor = addOpacity(_color, 0.8)
  const boxShadowColor = colors[color] && colors[color][500]
  return {
    light: {
      boxShadow: 'inset 0 0 0px 1px ' + boxShadowColor,
      color: get(color, 500)
    },
    dark: {
      boxShadow: 'inset 0 0 0px 1px ' + darkModeColor,
      color: darkModeColor
    }
  }
}

const variantProps = (props) => {
  const { variant, colorMode } = props
  switch (variant) {
    case 'solid':
      return solidStyle(props)[colorMode]
    case 'subtle':
      return subtleStyle(props)[colorMode]
    case 'outline':
      return outlineStyle(props)[colorMode]
    default:
      return {}
  }
}

const useBadgeStyle = (props) => {
  return variantProps(props)
}

export default useBadgeStyle
