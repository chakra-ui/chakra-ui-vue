/**
 * Hey! Welcome to @chakra-ui/vue CInputGroup
 *
 * CInputGroup allows grouping of input elements
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInputGroup/CInputGroup.js
 */

import { StringArray } from '../config/props/props.types'
import { inputSizes } from '../CInput/utils/input.styles'
import { cloneVNode, kebabify } from '../utils'

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
  functional: true,
  inject: ['$chakraTheme'],
  props: {
    size: {
      type: StringArray,
      default: 'md'
    }
  },
  render (h, { injections, data, slots, props }) {
    const theme = injections.$chakraTheme()
    const { sizes } = theme

    let pl = null
    let pr = null
    const height = inputSizes[props.size] && inputSizes[props.size].height

    const children = slots().default.filter(e => e.tag)

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
              size: props.size
            },
            attrs: {
              borderRadius: clone.data.attrs.rounded,
              paddingLeft: clone.data.attrs.pl || pl,
              paddingRight: clone.data.attrs.pr || pr,
              ...clone.data.attrs
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
            size: props.size
          }
        }, vnode.componentOptions.children)
      })

    return h(CBox, {
      props: {
        as: props.as
      },
      attrs: {
        display: 'flex',
        position: 'relative',
        ...data.attrs,
        'data-chakra-component': 'CInputGroup'
      }
    }, clones)
  }
}

export default CInputGroup
