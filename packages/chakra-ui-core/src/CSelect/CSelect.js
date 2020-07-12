/**
 * Hey! Welcome to @chakra-ui/vue CSelect
 *
 * Select component is a component that allows users
 * pick a value from predefined options.
 *
 * @see Docs     https://vue.chakra-ui.com/select
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSelect/CSelect.js
 */

import { inputProps } from '../CInput/utils/input.props'

import CBox from '../CBox'
import CIcon from '../CIcon'
import CInput from '../CInput'
import { createStyledAttrsMixin, extractListeners, forwardProps } from '../utils'
import splitProps from './utils/select.utils'

/**
 * CSelectIconWrapper component
 *
 * The wrapper component for the select icon
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/select
 */
const CSelectIconWrapper = {
  name: 'SelectIconWrapper',
  functional: true,
  render (h, { data, slots, ...rest }) {
    return h(CBox, {
      ...rest,
      attrs: {
        ...data.attrs,
        position: 'absolute',
        display: 'inline-flex',
        width: '1.5rem',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        right: '0.5rem',
        top: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        transform: 'translateY(-50%)',
        'data-chakra-component': 'CSelectIconWrapper'
      }
    }, slots().default)
  }
}

/**
 * CSelectInput component
 *
 * The select input component
 *
 * @extends CInput
 * @see Docs https://vue.chakra-ui.com/select
 */
const CSelectInput = {
  name: 'CSelectInput',
  functional: true,
  props: {
    ...inputProps,
    placeholder: String,
    value: String
  },
  render (h, { props, data, slots, listeners, ...rest }) {
    const nonNativeEvents = {
      change: (e) => {
        const emitChange = listeners.change
        if (emitChange) {
          emitChange(e)
        }
      }
    }

    const { native, nonNative } = extractListeners({ listeners }, nonNativeEvents)

    return h(CInput, {
      ...rest,
      props: {
        ...forwardProps(props),
        as: 'select'
      },
      on: nonNative,
      nativeOn: native,
      domProps: {
        value: props.value
      },
      attrs: {
        as: 'select',
        appearance: 'none',
        pr: '2rem',
        pb: 'px',
        lineHeight: 'normal',
        ...data.attrs,
        'data-chakra-component': 'CSelectInput'
      }
    }, [
      props.placeholder && h('option', {
        attrs: {
          value: ''
        }
      }, props.placeholder),
      slots().default
    ])
  }
}

/**
 * CSelect component
 *
 * The select wrapper component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/select
 */
const CSelect = {
  mixins: [createStyledAttrsMixin('CSelect', true)],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...inputProps,
    rootProps: {
      type: Object,
      default: () => ({})
    },
    icon: String,
    iconSize: {
      type: Number,
      default: 5
    },
    size: {
      type: String,
      default: 'md'
    },
    isReadOnly: Boolean,
    isDisabled: Boolean,
    placeholder: String,
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    _color () {
      return this.colorMode === 'dark' ? 'whiteAlpha.800' : 'inherit'
    },
    _opacity () {
      return this.isReadOnly || this.isDisabled ? 0.5 : null
    },
    _value () {
      return this.value
    },
    allSplitProps () {
      return splitProps(this.$data.attrs$)
    },
    componentStyles () {
      const [root] = this.allSplitProps
      return {
        ...root,
        ...this.rootProps,
        position: 'relative',
        width: '100%'
      }
    }
  },
  render (h) {
    const { icon, iconSize } = this.$props
    const [, select] = this.allSplitProps
    return h('div', {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        'data-chakra-component': 'CSelect'
      }
    }, [
      h(CSelectInput, {
        props: {
          placeholder: this.placeholder,
          ...forwardProps(this.$props)
        },
        attrs: {
          color: this._color,
          ...select,
          value: this._value
        },
        on: {
          change: (e) => {
            this.$emit('change', e.target.value)
          }
        }
      }, this.$slots.default),
      h(CSelectIconWrapper, {
        attrs: {
          opacity: this._opacity,
          color: select.color || this._color
        }
      }, [
        h(CIcon, {
          props: {
            name: icon || 'chevron-down',
            size: iconSize
          },
          attrs: {
            focusable: false,
            'aria-hidden': true
          }
        })
      ])
    ])
  }
}

export default CSelect
