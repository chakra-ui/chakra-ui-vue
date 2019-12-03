import Button from '../Button'
import Icon from '../Icon'
import Box from '../Box'
import styleProps from '../config/props'
import { forwardProps } from '../utils'
import { buttonProps } from '../Button/button.props'

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

export default {
  name: 'IconButton',
  inject: ['$theme', '$colorMode'],
  props: {
    icon: {
      type: [String]
    },
    isRound: {
      type: [Boolean]
    },
    _ariaLabel: {
      type: [String]
    },
    ...buttonProps,
    ...styleProps
  },
  render (h) {
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = this.$props

    return h(Button, {
      props: {
        p: 0,
        rounded: this.isRound ? 'full' : 'md',
        size: this.size,
        ...forwardProps(props)
      },
      attrs: {
        'aria-label': this._ariaLabel
      }
    },
    [typeof this.icon === 'string'
      ? h(Icon, {
        props: {
          ...baseStyles,
          name: this.icon,
          color: 'currentColor',
          mb: '2px',
          size: '1em'
        },
        attrs: {
          focusable: false,
          'aria-hidden': true
        }
      })
      : h(Box, {
        props: {
          as: this.icon,
          color: 'currentColor'
        },
        attrs: {
          focusable: true
        }
      })]
    )
  }
}
