/**
 * Hey! Welcome to @chakra-ui/vue Flex
 *
 * `CFlex` is `CBox` with `display: flex` and comes with
 * helpful style shorthands. It renders a `div` element.
 *
 * @see Docs     https://vue.chakra-ui.com/flex
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFlex/CFlex.js
 */

import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../CBox'

/**
 * CFlex component
 *
 * `CFlex` is `CBox` with display: flex and comes with helpful style shorthands.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/flex
 */
const CFlex = {
  name: 'CFlex',
  props: {
    as: String,
    align: [String, Array],
    justify: [String, Array],
    wrap: [String, Array],
    direction: [String, Array],
    size: [String, Array],
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
        display: 'flex',
        flexDirection: this.direction,
        alignItems: this.align,
        justifyContent: this.justify,
        flexWrap: this.wrap,
        h: this.size,
        w: this.size,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CFlex'
      }
    }, this.$slots.default)
  }
}

export default CFlex
