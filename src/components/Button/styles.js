import styled from 'vue-styled-components'
// import { colors } from '../../lib/theme'

const buttonProps = {
  variant: String
}

/**
 * @description Determines style colors for solid variant
 * @param {{color:String, colorMode:String, _theme:Object }} params
 */
const solidVariantProps = ({ color, colorMode = 'light', _theme }) => {
  let style = {
    light: {
      bg: `${color}.500`,
      color: 'white',
      _hover: {
        bg: `${color}.600`
      },
      _active: {
        bg: `${color}.700`
      }
    }
  }
  return style[colorMode]
}

/**
 * @description Generates styled for variants
 * @param {Object} props
 * @returns {Object} Variant styles object
 */
const variantProps = props => {
  switch (props.variant) {
    case 'solid':
      return solidVariantProps(props)
  }
}

// const baseProps = {
//   display: 'inline-flex',
//   appearance: 'none',
//   alignItems: 'center',
//   justifyContent: 'center',
//   transition: 'all 250ms',
//   userSelect: 'none',
//   position: 'relative',
//   whiteSpace: 'nowrap',
//   verticalAlign: 'middle',
//   lineHeight: '1.2',
//   outline: 'none'
// }

const Button = styled('button', buttonProps)`
  font-size: 1em;
  text-align: center;
  padding: 10px 15px;
  border-radius: ${({ radius }) => radius ? '6px' : null};
  ${(props) => variantProps(props)}
`

export default Button
