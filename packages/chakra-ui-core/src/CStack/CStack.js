/**
 * Hey! Welcome to @chakra-ui/vue Stack
 *
 * Stack is a layout utility component that makes
 * it easy to stack elements together and apply a space between them.
 *
 * @see Docs     https://vue.chakra-ui.com/stack
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CStack/CStack.js
 */

import { StringArray, SNA } from '../config/props/props.types'
import { cloneVNode, createStyledAttrsMixin } from '../utils'

import CFlex from '../CFlex'
import CBox from '../CBox'

/**
 * CStack component
 *
 * Flex container to stck it's children
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/stack
 */
const CStack = {
  mixins: [createStyledAttrsMixin('CStack')],
  props: {
    direction: [String, Array],
    isInline: {
      type: Boolean,
      default: false
    },
    isReversed: {
      type: Boolean,
      default: false
    },
    align: StringArray,
    justify: StringArray,
    spacing: {
      type: SNA,
      default: 2
    },
    shouldWrapChildren: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _isInline () {
      return this.isInline || (this.direction && this.direction.startsWith('row'))
    },
    _isReversed () {
      return this.isReversed || (this.direction && this.direction.endsWith('reverse'))
    },
    _direction () {
      let _direction

      if (this._isInline) {
        _direction = 'row'
      }

      if (this._isReversed) {
        _direction = this.isInline ? 'row-reverse' : 'column-reverse'
      }

      if (this.direction) {
        _direction = this.direction
      }

      if (!this._isInline && !this._isReversed && !this.direction) {
        _direction = 'column'
      }

      return _direction
    }
  },
  render (h) {
    const children = this.$slots.default.filter(e => e.tag)
    const stackables = children.map((node, index) => {
      const isLastChild = children.length === index + 1
      const spacingProps = this._isInline
        ? { [this._isReversed ? 'ml' : 'mr']: isLastChild ? null : this.spacing }
        : { [this._isReversed ? 'mt' : 'mb']: isLastChild ? null : this.spacing }

      const clone = cloneVNode(node, h)
      const { propsData } = clone.componentOptions
      const { attrs } = clone.data

      // If children nodes should wrap,
      // we wrap them inside block with
      // display set to inline block.
      if (this.shouldWrapChildren) {
        return h(CBox, {
          props: {
            as: this.as,
            to: this.to
          },
          attrs: {
            d: 'inline-block',
            ...this.computedAttrs
          }
        }, [clone])
      }

      // Otherwise we simply set spacing props
      // to current node.
      clone.componentOptions.propsData = {
        ...propsData
      }

      clone.data.attrs = {
        ...attrs,
        ...spacingProps
      }

      return clone
    })

    return h(CFlex, {
      props: {
        as: this.as,
        align: this.align,
        justify: this.justify,
        direction: this._direction
      },
      attrs: this.computedAttrs
    }, stackables)
  }
}

export default CStack
