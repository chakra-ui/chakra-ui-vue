/**
 * Hey! Welcome to @chakra-ui/vue IconButton
 *
 * CIconButton is used to render icons that support
 * click interactions.
 *
 * CIconButton composes the CButton component, except that it renders only an icon.
 *
 * @see Docs     https://vue.chakra-ui.com/iconbutton
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CIconButton/CIconButton.js
 */

import styleProps from '../config/props'
import { forwardProps } from '../utils'
import { buttonProps } from '../CButton/utils/button.props'

import CButton from '../CButton'
import CIcon from '../CIcon'
import CBox from '../CBox'

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

/**
 * CIconButton component
 *
 * CIconButton is used to render icons that support
 * click interactions
 *
 * @extends CButton
 * @see Docs https://vue.chakra-ui.com/iconbutton
 */
const CIconButton = {
  name: 'CIconButton',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    icon: {
      type: [String]
    },
    isRound: {
      type: [Boolean]
    },
    ariaLabel: {
      type: [String],
      required: true
    },
    ...buttonProps,
    ...styleProps
  },
  render (h) {
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = this.$props

    return h(CButton, {
      props: {
        p: 0,
        rounded: this.isRound ? 'full' : 'md',
        size: this.size,
        ...forwardProps(props)
      },
      attrs: {
        'aria-label': this.ariaLabel,
        'data-chakra-component': 'CIconButton'
      },
      on: {
        click: e => this.$emit('click', e)
      }
    },
    [typeof this.icon === 'string'
      ? h(CIcon, {
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
      : h(CBox, {
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

export default CIconButton
