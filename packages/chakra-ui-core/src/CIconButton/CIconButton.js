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
    ...buttonProps
  },
  render (h) {
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = this.$props

    return h(CButton, {
      props: forwardProps(props),
      attrs: {
        'aria-label': this.ariaLabel,
        rounded: this.isRound ? 'full' : 'md',
        ...this.$attrs,
        p: 0
      },
      on: {
        click: e => this.$emit('click', e)
      }
    },
    [typeof this.icon === 'string'
      ? h(CIcon, {
        props: {
          name: this.icon
        },
        attrs: {
          ...baseStyles,
          color: 'currentColor',
          mb: '2px',
          size: '1em',
          focusable: false,
          'aria-hidden': true
        }
      })
      : h(CBox, {
        props: {
          as: this.icon
        },
        attrs: {
          focusable: true,
          color: 'currentColor'
        }
      })]
    )
  }
}

export default CIconButton
