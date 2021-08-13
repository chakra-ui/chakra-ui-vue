/**
 * Hey! Welcome to @chakra-ui/vue ButtonGroup
 *
 * ButtonGroup component allows the user to group a
 * related collection of buttons in one visual region.
 *
 * @see Docs     https://vue.chakra-ui.com/button
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CButtonGroup/CButtonGroup.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CButton/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#button
 */

import CBox from '../CBox'

/**
 * CButtonGroup component
 *
 * Wrapper for children `CButton` components
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/button
 */
const CButtonGroup = {
  name: 'CButtonGroup',
  functional: true,
  props: {
    size: [String, Array],
    variantColor: [String, Array],
    variant: [String, Array],
    isAttached: Boolean,
    spacing: {
      type: [Number, Array, String],
      default: 2
    }
  },
  render (h, context) {
    const { props, data, slots, listeners } = context
    const children = slots().default.filter(e => e.tag)
    const count = children.length

    const clones = children.map((node, index) => {
      const isFirst = index === 0
      const isLast = index === count - 1
      const { attrs } = node.data
      const { propsData } = node.componentOptions
      propsData.size = props.size || propsData.size
      propsData.variantColor = propsData.variantColor || props.variantColor
      propsData.variant = propsData.variant || props.variant
      propsData.rounded = propsData.rounded || props.rounded
      propsData._focus = { boxShadow: 'outline', zIndex: 1 }

      // Radius adjustment
      node.data.attrs = {
        ...attrs,
        ...(!isLast && !props.isAttached && { mr: props.spacing }),
        ...(isFirst && props.isAttached && { 'rounded-right': 0 }),
        ...(isLast && props.isAttached && { 'rounded-left': 0 }),
        ...(!isLast && props.isAttached && { 'border-right': 0 }),
        ...(!isFirst && !isLast && props.isAttached && { rounded: 0 }),
        _focus: { boxShadow: 'outline', zIndex: 1 }
      }

      node.componentOptions.propsData = {
        ...node.componentOptions.propsData,
        ...propsData
      }

      return node
    })

    return h(CBox, {
      ...data,
      attrs: {
        d: 'inline-block',
        ...data.attrs,
        role: 'group',
        'data-chakra-component': 'CButtonGroup'
      },
      on: listeners
    }, clones)
  }
}

export default CButtonGroup
