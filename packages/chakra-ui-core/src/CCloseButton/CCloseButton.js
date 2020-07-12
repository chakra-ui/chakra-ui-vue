/**
 * Hey! Welcome to @chakra-ui/vue CloseButton
 *
 * The CloseButton is essentially a button with a close icon.
 *
 * It is used to handle the close functionality in feedback
 * and overlay components like Alerts, Toasts, Drawers and Modals.
 *
 * @see Docs     https://vue.chakra-ui.com/closebutton
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCloseButton/CCloseButton.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCloseButton/accessibility.md
 */

import { extractListeners } from '../utils'

import CIcon from '../CIcon'
import CPseudoBox from '../CPseudoBox'
import props from './utils/closebutton.props'
import { sizes, baseProps } from './utils/closebutton.styles'

/**
 * CCloseButton component
 *
 * Component as button with close icon
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/closebutton
 */
const CCloseButton = {
  name: 'CCloseButton',
  functional: true,
  inject: ['$chakraColorMode'],
  props,
  render (h, context) {
    const { props, data, injections, listeners, ...rest } = context

    const colorMode = injections.$chakraColorMode()

    // Pseudo styles
    const hoverColor = { light: 'blackAlpha.100', dark: 'whiteAlpha.100' }
    const activeColor = { light: 'blackAlpha.200', dark: 'whiteAlpha.200' }

    // Size styles
    const buttonSize = sizes[props.size] && sizes[props.size].button
    const iconSize = sizes[props.size] && sizes[props.size].icon

    // Event listeners
    const nonNativeEvents = {
      click: (e) => {
        const emitClick = context.listeners.click
        if (emitClick) {
          emitClick(e)
        }
      }
    }
    const { native, nonNative } = extractListeners(context, nonNativeEvents)

    return h(CPseudoBox, {
      ...rest,
      props: {
        as: 'button'
      },
      on: nonNative,
      nativeOn: native,
      attrs: {
        'aria-label': props.ariaLabel,
        'aria-disabled': props.isDisabled,
        outline: 'none',
        h: buttonSize,
        w: buttonSize,
        disabled: props.isDisabled,
        cursor: 'pointer',
        _hover: { bg: hoverColor[colorMode] },
        _active: { bg: activeColor[colorMode] },
        ...baseProps,
        ...data.attrs,
        'data-chakra-component': 'CCloseButton'
      }
    }, [h(CIcon, {
      props: {
        color: props.color,
        name: 'close',
        size: iconSize
      },
      attrs: {
        focusable: false,
        'aria-hidden': true
      }
    })])
  }
}

export default CCloseButton
