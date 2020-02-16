import { StringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import { inputSizes } from '../Input/input.styles'
import Box from '../Box'
import { cloneVNode, forwardProps } from '../utils'
import { InputLeftElement, InputRightElement } from '../InputElement'
import Input from '../Input'

const InputGroup = {
  name: 'InputGroup',
  inject: ['$theme'],
  props: {
    ...baseProps,
    size: {
      type: StringArray,
      default: 'md'
    }
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const { sizes } = this.theme
    let pl = null
    let pr = null
    const height = inputSizes[this.size] && inputSizes[this.size]['height']
    const children = this.$slots.default
    const clones = children
      .map((vnode) => {
        if (vnode.tag.includes(InputLeftElement.name)) {
          pl = sizes[height]
        }
        if (vnode.tag.includes(InputRightElement.name)) {
          pr = sizes[height]
        }
        if (vnode.tag.includes(Input.name)) {
          const clone = cloneVNode(vnode, h)
          return h(clone.componentOptions.Ctor, {
            ...clone.data,
            ...(clone.componentOptions.listeners || {}),
            props: {
              ...(clone.data.props || {}),
              ...clone.componentOptions.propsData,
              borderRadius: clone.componentOptions.propsData.rounded,
              size: this.size,
              paddingLeft: clone.componentOptions.propsData.pl || pl,
              paddingRight: clone.componentOptions.propsData.pr || pr
            }
          }, vnode.componentOptions.children)
        }
        const clone = cloneVNode(vnode, h)
        return h(clone.componentOptions.Ctor, {
          ...clone.data,
          ...(clone.componentOptions.listeners || {}),
          props: {
            ...(clone.data.props || {}),
            ...clone.componentOptions.propsData,
            size: this.size
          }
        }, vnode.componentOptions.children)
      })

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        display: 'flex',
        position: 'relative'
      }
    }, clones)
  }
}

export default InputGroup
