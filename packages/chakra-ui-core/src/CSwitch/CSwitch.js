/**
 * Hey! Welcome to @chakra-ui/vue CSwitch
 *
 * The Switch component is used as an alternative for the Checkbox
 * component, switch between enabled or disabled states.
 *
 * @see Docs     https://vue.chakra-ui.com/stat
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSwitch/CSwitch.js
 */

import { forwardProps, extractListeners } from '../utils'

import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'

const switchSizes = {
  sm: {
    width: '1.375rem',
    height: '0.75rem'
  },
  md: {
    width: '1.875rem',
    height: '1rem'
  },
  lg: {
    width: '2.875rem',
    height: '1.5rem'
  }
}

/**
 * CSwitch component
 *
 * the switch component that serves as an alternative for checkbox.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/stat
 */
const CSwitch = {
  name: 'CSwitch',
  functional: true,
  model: {
    prop: 'isChecked',
    event: 'change'
  },
  inject: ['$chakraColorMode'],
  props: {
    id: String,
    name: String,
    value: Boolean,
    ariaLabel: String,
    ariaLabelledBy: String,
    color: {
      type: String,
      default: 'blue'
    },
    defaultIsChecked: Boolean,
    isChecked: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    isDisabled: Boolean,
    isInvalid: Boolean
  },
  render (h, { props, data, listeners, injections, ...rest }) {
    const colorMode = injections.$chakraColorMode()
    const width = switchSizes[props.size] && switchSizes[props.size].width
    const height = switchSizes[props.size] && switchSizes[props.size].height

    const styleProps = {
      rounded: 'full',
      justifyContent: 'flex-start',
      width,
      height,
      bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.300',
      boxSizing: 'content-box',
      p: '2px',
      _checked: {
        bg: `${props.color}.500`
      },
      _child: {
        transform: 'translateX(0)'
      },
      _checkedAndChild: {
        transform: `translateX(calc(${width} - ${height}))`
      },
      _focus: {
        boxShadow: 'outline'
      },
      _hover: {
        cursor: 'pointer'
      },
      _checkedAndHover: {
        cursor: 'pointer'
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed'
      }
    }

    // Events
    const nonNativeEvents = {
      change: (e) => {
        const emitChange = listeners.change
        if (emitChange && typeof emitChange === 'function') {
          emitChange(!props.isChecked)
        }
      }
    }

    const { native, nonNative } = extractListeners({ listeners }, nonNativeEvents)

    return h(CBox, {
      ...rest,
      props: {
        ...forwardProps(props),
        as: 'label'
      },
      attrs: {
        display: 'inline-block',
        verticalAlign: 'middle',
        ...data.attrs,
        'data-chakra-component': 'CSwitch'
      }
    }, [
      h(CVisuallyHidden, {
        props: {
          as: 'input'
        },
        attrs: {
          type: 'checkbox',
          'aria-label': props.ariaLabel,
          'aria-labelledby': props.ariaLabelledBy,
          id: props.id,
          name: props.name,
          value: props.value,
          'aria-invalid': props.isInvalid,
          defaultChecked: props.defaultIsChecked,
          checked: props.isChecked,
          disabled: props.isDisabled
        },
        on: nonNative,
        nativeOn: native
      }),
      h(CControlBox, {
        attrs: styleProps
      }, [
        h(CBox, {
          attrs: {
            bg: 'white',
            transition: 'transform 250ms',
            rounded: 'full',
            h: height,
            w: height
          }
        })
      ])
    ])
  }
}

export default CSwitch
