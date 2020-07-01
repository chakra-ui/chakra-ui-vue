/**
 * Hey! Welcome to @chakra-ui/vue Flex
 *
 * `CFlex` is `CBox` with `display: flex` and comes with
 * helpful style shorthands. It renders a `div` element.
 *
 * @see Docs     https://vue.chakra-ui.com/flex
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFlex/CFlex.js
 */

import { createStyledAttrsMixin } from '../utils'
import { SNA } from '../config/props/props.types'

/**
 * CFlex component
 *
 * `CFlex` is `CBox` with display: flex and comes with helpful style shorthands.
 *
 * @see Docs https://vue.chakra-ui.com/flex
 */
const CFlex = {
  mixins: [createStyledAttrsMixin('CFlex')],
  props: {
    as: {
      type: String,
      default: 'div'
    },
    align: SNA,
    justify: SNA,
    wrap: SNA,
    direction: SNA,
    size: SNA
  },
  computed: {
    componentStyles () {
      return {
        display: 'flex',
        flexDirection: this.direction,
        alignItems: this.align,
        justifyContent: this.justify,
        flexWrap: this.wrap,
        h: this.size,
        w: this.size
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CFlex
