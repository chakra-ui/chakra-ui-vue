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

import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

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
  props: {
    size: [String, Array],
    variantColor: [String, Array],
    variant: [String, Array],
    isAttached: Boolean,
    spacing: {
      type: [Number, Array, String],
      default: 2
    },
    ...baseProps
  },
  render (h) {
    const children = this.$slots.default.filter(e => e.tag)
    const count = children.length

    const clones = children.map((node, index) => {
      const isFirst = index === 0
      const isLast = index === count - 1
      const { propsData } = node.componentOptions
      propsData.size = this.size || propsData.size
      propsData.variantColor = propsData.variantColor || this.variantColor
      propsData.variant = propsData.variant || this.variant
      propsData.rounded = propsData.rounded || this.rounded
      propsData._focus = { boxShadow: 'outline', zIndex: 1 }

      // Radius adjustment
      node.componentOptions.propsData = {
        ...propsData,
        ...(!isLast && !this.isAttached && { mr: this.spacing }),
        ...(isFirst && this.isAttached && { roundedRight: 0 }),
        ...(isLast && this.isAttached && { roundedLeft: 0 }),
        ...(!isLast && this.isAttached && { borderRight: 0 }),
        ...(!isFirst && !isLast && this.isAttached && { rounded: 0 })
      }

      return node
    })

    return h(CBox, {
      props: {
        d: 'inline-block',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CButtonGroup'
      }
    }, clones)
  }
}

export default CButtonGroup
