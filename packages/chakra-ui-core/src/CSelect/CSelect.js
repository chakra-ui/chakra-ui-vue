/**
 * Hey! Welcome to @chakra-ui/vue CSelect
 *
 * Select component is a component that allows users
 * pick a value from predefined options.
 *
 * @see Docs     https://vue.chakra-ui.com/select
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSelect/CSelect.js
 */

import { baseProps } from '../config'
import styleProps from '../config/props'
import { inputProps } from '../CInput/utils/input.props'
import splitProps from './utils/select.utils'

import CBox from '../CBox'
import CIcon from '../CIcon'
import CInput from '../CInput'

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
  props: baseProps,
  render (h) {
    return h(CBox, {
      props: {
        ...this.$props,
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
        transform: 'translateY(-50%)'
      },
      attrs: {
        'data-chakra-component': 'CSelectIconWrapper'
      }
    }, this.$slots.default)
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
  props: {
    ...styleProps,
    ...inputProps,
    placeholder: String,
    value: String
  },
  render (h) {
    return h(CInput, {
      props: {
        ...this.$props,
        as: 'select',
        appearance: 'none',
        pr: '2rem',
        pb: 'px',
        lineHeight: 'normal'
      },
      on: {
        change: (e) => this.$emit('change', e)
      },
      domProps: {
        value: this.value
      }
    }, [
      this.placeholder && h('option', {
        attrs: {
          value: ''
        }
      }, this.placeholder),
      this.$slots.default
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
  name: 'CSelect',
  inject: ['$chakraColorMode'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...styleProps,
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
    colorMode () {
      return this.$chakraColorMode()
    },
    _color () {
      return this.colorMode === 'dark' ? 'whiteAlpha.800' : 'inherit'
    },
    _opacity () {
      return this.isReadOnly || this.isDisabled ? 0.5 : null
    },
    _value () {
      return this.value
    }
  },
  render (h) {
    const { rootProps, icon, iconSize, ...props } = this.$props
    const [root, select] = splitProps(props)
    return h(CBox, {
      props: {
        ...root,
        ...rootProps,
        position: 'relative',
        width: '100%'
      },
      attrs: {
        'data-chakra-component': 'CSelect'
      }
    }, [
      h(CSelectInput, {
        props: {
          color: this._color,
          placeholder: this.placeholder,
          ...select
        },
        on: {
          change: (e) => this.$emit('change', e.target.value)
        },
        domProps: {
          value: this._value
        }
      }, this.$slots.default),
      h(CSelectIconWrapper, {
        props: {
          opacity: this._opacity,
          color: select.color || this._color
        }
      }, [
        h(CIcon, {
          props: {
            name: this.icon || 'chevron-down',
            size: this.iconSize
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
