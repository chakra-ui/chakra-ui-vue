import { baseProps } from '../config'
import Box from '../Box'
import styleProps from '../config/props'
import { inputProps } from '../Input/input.props'
import Input from '../Input'
import splitProps from './select.utils'
import Icon from '../Icon'

/**
 * SelectIconWrapper component
 */
const SelectIconWrapper = {
  name: 'SelectIconWrapper',
  props: baseProps,
  render (h) {
    return h(Box, {
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
      }
    }, this.$slots.default)
  }
}

const SelectInput = {
  name: 'SelectInput',
  props: {
    ...styleProps,
    ...inputProps,
    placeholder: String
  },
  render (h) {
    return h(Input, {
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

const Select = {
  name: 'Select',
  inject: ['$colorMode'],
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
    placeholder: String
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    _color () {
      return this.colorMode === 'dark' ? 'whiteAlpha.800' : 'inherit'
    },
    _opacity () {
      return this.isReadOnly || this.isDisabled ? 0.5 : null
    }
  },
  render (h) {
    const { rootProps, icon, iconSize, ...props } = this.$props
    const [root, select] = splitProps(props)
    return h(Box, {
      props: {
        ...root,
        ...rootProps,
        position: 'relative',
        width: '100%'
      }
    }, [
      h(SelectInput, {
        props: {
          color: this._color,
          placeholder: this.placeholder,
          ...select
        },
        on: {
          change: (e) => this.$emit('change', e.target.value)
        }
      }, this.$slots.default),
      h(SelectIconWrapper, {
        props: {
          opacity: this._opacity,
          color: select.color || this._color
        }
      }, [
        h(Icon, {
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

export default Select
