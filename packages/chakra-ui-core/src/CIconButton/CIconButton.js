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

import { extractListeners } from '../utils'
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
  functional: true,
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
  render (h, context) {
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = context.props
    const { ariaLabel, isRound, icon } = props

    const nonNativeEvents = {
      click: (e) => {
        const emitClick = context.listeners.click
        if (emitClick) {
          emitClick(e)
        }
      }
    }

    const { native, nonNative } = extractListeners(context, nonNativeEvents)

    return h(CButton, {
      props,
      attrs: {
        'aria-label': ariaLabel,
        rounded: isRound ? 'full' : 'md',
        ...context.data.attrs,
        'data-chakra-component': 'CIconButton',
        p: 0
      },
      on: nonNative,
      nativeOn: native
    },
    [typeof icon === 'string'
      ? h(CIcon, {
        props: {
          name: icon
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
          as: icon
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
