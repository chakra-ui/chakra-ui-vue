/**
 * Hey! Welcome to @chakra-ui/vue Box
 *
 * Box is the most abstract component on top of which all
 * other @chakra-ui/vue components are built. By default, it renders a `div` element
 *
 * @see Docs     https://vue.chakra-ui.com/box
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBox/CBox.js
 */

import { css } from 'emotion'
import { baseProps } from '../config/props'
import { forwardProps, createStyledAttrsMixin, systemProps } from '../utils'

/**
 * CBox component
 *
 * Abstract component on top of which all other Chakra components are built.
 *
 * @see Docs https://vue.chakra-ui.com/box
 */
const CBox = {
  name: 'CBox',
  inject: ['$chakraTheme'],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    to: {
      type: [String, Object],
      default: ''
    },
    ...baseProps
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    boxClassName () {
      const { as, to, ...cleanedStyleProps } = forwardProps(this.$props)
      const boxStylesObject = systemProps({ ...cleanedStyleProps, theme: this.theme })
      return css(boxStylesObject)
    }
  },
  render (h) {
    return h(this.as, {
      props: {
        to: this.to
      },
      class: this.boxClassName,
      on: this.$listeners,
      attrs: {
        'data-chakra-component': 'CBox'
      }
    }, this.$slots.default)
  }
}

export default CBox

export const _CBox = {
  name: 'CBox',
  mixins: [createStyledAttrsMixin('CBox')],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    to: {
      type: [String, Object],
      default: ''
    }
  },
  render (h) {
    return h(this.as, {
      props: {
        to: this.to
      },
      class: this.className,
      on: this.listeners$,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}
