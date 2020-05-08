/**
 * Hey! Welcome to @chakra-ui/vue CInputGroup
 *
 * CInputGroup allows grouping of input elements
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInputGroup/CInputGroup.js
 */

import { StringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import { inputSizes } from '../CInput/utils/input.styles'
import { cloneVNode, forwardProps, kebabify } from '../utils'

import CBox from '../CBox'

/**
 * CInputElement component
 *
 * allows grouping of input elements
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/input
 */
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
        'data-chakra-component': 'CInputGroup'
      }
    }, clones)
  }
}

export default CInputGroup
