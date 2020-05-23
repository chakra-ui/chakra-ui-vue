/**
 * Hey! Welcome to @chakra-ui/vue Stack
 *
 * Stack is a layout utility component that makes
 * it easy to stack elements together and apply a space between them.
 *
 * @see Docs     https://vue.chakra-ui.com/stack
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CStack/CStack.js
 */

import { baseProps } from '../config/props'
import { StringArray, SNA } from '../config/props/props.types'
import { forwardProps, cloneVNode } from '../utils'

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
  name: 'CStack',
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
    },
    ...baseProps
  },
  render (h) {
    const _isReversed = this.isReversed || (this.direction && this.direction.endsWith('reverse'))
    const _isInline = this.isInline || (this.direction && this.direction.startsWith('row'))
    let _direction

    if (_isInline) {
      _direction = 'row'
    }

    if (_isReversed) {
      _direction = this.isInline ? 'row-reverse' : 'column-reverse'
    }

    if (this.direction) {
      _direction = this.direction
    }

    if (!_isInline && !_isReversed && !this.direction) {
      _direction = 'column'
    }

    const children = this.$slots.default.filter(e => e.tag)
    const stackables = children.map((node, index) => {
      const isLastChild = children.length === index + 1
      const spacingProps = _isInline
        ? { [_isReversed ? 'ml' : 'mr']: isLastChild ? null : this.spacing }
        : { [_isReversed ? 'mt' : 'mb']: isLastChild ? null : this.spacing }
      const clone = cloneVNode(node, h)
      const { propsData } = clone.componentOptions

      // If children nodes should wrap, we wrap them inside block with
      // display set to inline block.
      if (this.shouldWrapChildren) {
        return h(CBox, {
          props: {
            d: 'inline-block',
            ...spacingProps,
            ...forwardProps(this.$props)
          }
        }, [clone])
      }

      // Otherwise we simply set spacing props to current node.
      clone.componentOptions.propsData = {
        ...propsData,
        ...spacingProps
      }

      return clone
    })

    return h(CFlex, {
      props: {
        align: this.align,
        justify: this.justify,
        direction: _direction,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CStack'
      }
    }, stackables)
  }
}

export default CStack
