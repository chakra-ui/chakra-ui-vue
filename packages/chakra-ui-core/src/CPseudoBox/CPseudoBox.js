/**
 * Hey! Welcome to @chakra-ui/vue PseudoBox
 *
 * The PseudoBox component
 *
 * @see Docs     https://vue.chakra-ui.com/pseudobox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPseudoBox/CPseudoBox.js
 */

import { css } from 'emotion'
import __css from '@styled-system/css'
import CBox from '../CBox'
import styleProps from '../config/props'
import { systemProps, createStyledAttrsMixin } from '../utils'
import { parsePseudoStyles } from './utils'

/**
 * CPseudoBox component
 *
 * The pseudobox component that accepts pseudo props
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/pseudobox
 */
const CPseudoBox = {
  name: 'CPseudoBox',
  inject: ['$chakraTheme'],
  props: {
    as: {
      type: [String, Object],
      default: () => 'div'
    },
    to: [String, Object],
    ...styleProps,
    chakraId: String
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    pseudoBoxClassName () {
      const { as, to, ...cleanedStyleProps } = this.$props
      const { pseudoStyles, baseStyles } = parsePseudoStyles(cleanedStyleProps)
      const _baseStyles = systemProps({ ...baseStyles, theme: this.theme })
      const _pseudoStyles = __css(pseudoStyles)(this.theme)
      return css({ ..._baseStyles, ..._pseudoStyles })
    }
  },
  render (h) {
    return h(CBox, {
      class: this.pseudoBoxClassName,
      props: {
        as: this.as,
        to: this.to
      },
      attrs: {
        'data-chakra-component': 'CPseudoBox'
      }
    }, this.$slots.default)
  }
}

/**
 * CPseudoBox component
 *
 * The pseudobox component that accepts pseudo props
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/pseudobox
 */
export const _CPseudoBox = {
  name: 'CPseudoBox',
  mixins: [createStyledAttrsMixin('CPseudoBox', true)],
  props: {
    as: {
      type: [String, Object],
      default: () => 'div'
    },
    to: [String, Object]
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

export default CPseudoBox
