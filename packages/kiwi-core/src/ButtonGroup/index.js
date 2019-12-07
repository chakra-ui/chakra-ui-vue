import Box from '../Box'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

const ButtonGroup = {
  name: 'ButtonGroup',
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
    const children = this.$slots.default
    const count = children.length

    const clones = children.map((node, index) => {
      const isFirst = index === 0
      const isLast = index === count - 1
      const { propsData } = node.componentOptions
      propsData['size'] = this.size || propsData['size']
      propsData['variantColor'] = propsData['variantColor'] || this.variantColor
      propsData['variant'] = propsData['variant'] || this.variant
      propsData['rounded'] = propsData['rounded'] || this.rounded
      propsData['_focus'] = { boxShadow: 'outline', zIndex: 1 }

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

    return h(Box, {
      props: {
        d: 'inline-block',
        ...forwardProps(this.$props)
      }
    }, clones)
  }
}

export default ButtonGroup
