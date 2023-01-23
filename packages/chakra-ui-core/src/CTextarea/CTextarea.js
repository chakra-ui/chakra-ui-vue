/**
 * Hey! Welcome to @chakra-ui/vue Textarea
 *
 * The Textarea component allows you to easily
 * create multi-line text inputs.
 *
 * @see Docs     https://vue.chakra-ui.com/textarea
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTextarea/CTextarea.js
 */

import { inputProps } from '../CInput/utils/input.props'
import { forwardProps, extractListeners } from '../utils'

import CInput from '../CInput'
import { SNA } from '../config/props.types'

/**
 * CTextarea component
 *
 * the textarea element component
 *
 * @extends CInput
 * @see Docs https://vue.chakra-ui.com/textarea
 */
const CTextarea = {
  name: 'CTextarea',
  functional: true,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...inputProps,
    inputValue: String,
    py: {
      type: SNA,
      default: '8px'
    },
    minHeight: {
      type: SNA,
      default: '80px'
    },
    fontFamily: {
      type: SNA,
      default: 'body'
    },
    lineHeight: {
      type: SNA,
      default: 'shorter'
    }
  },
  render (h, { props, slots, data, listeners, ...rest }) {
    // Default styles
    const defaultStyles = {
      py: '8px',
      minHeight: '80px',
      fontFamily: 'body',
      lineHeight: 'shorter'
    }

    // Event listeners
    const nonNativeEvents = {
      input: (value, $e) => {
        const emitChange = listeners.change

        if (emitChange && $e instanceof Event) {
          if (typeof emitChange === 'function') {
            return emitChange(value, $e)
          }
          emitChange.forEach(listener => listener(value, $e))
        }
      }
    }
    const { nonNative } = extractListeners({ listeners }, nonNativeEvents)

    return h(
      CInput,
      {
        ...rest,
        props: {
          ...forwardProps(props),
          as: 'textarea'
        },
        attrs: {
          ...defaultStyles,
          ...(data.attrs || {}),
          'data-chakra-component': 'CTextarea'
        },
        on: nonNative
      },
      slots().default
    )
  }
}

export default CTextarea
