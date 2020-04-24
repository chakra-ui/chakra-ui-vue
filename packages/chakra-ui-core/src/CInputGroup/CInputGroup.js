import { StringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import { inputSizes } from '../CInput/utils/input.styles'
import CBox from '../CBox'
import { cloneVNode, forwardProps, kebabify } from '../utils'

const CInputGroup = {
  name: 'CInputGroup',
  inject: ['$chakraTheme'],
  props: {
    ...baseProps,
    size: {
      type: StringArray,
      default: 'md'
    }
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    }
  },
  render (h) {
    const { sizes } = this.theme
    let pl = null
    let pr = null
    const height = inputSizes[this.size] && inputSizes[this.size]['height']
    const children = this.$slots.default.filter(e => e.tag)
    const clones = children
      .map((vnode) => {
        if (vnode.tag.includes('CInputLeftElement')) {
          pl = sizes[height]
        }
        if (vnode.tag.includes('CInputRightElement')) {
          pr = sizes[height]
        }
        if (kebabify(vnode.componentOptions.tag) === 'c-input') {
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

    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        display: 'flex',
        position: 'relative'
      },
      attrs: {
        'data-chakra-input-group': ''
      }
    }, clones)
  }
}

export default CInputGroup
