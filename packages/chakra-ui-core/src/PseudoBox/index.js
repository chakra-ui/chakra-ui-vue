import { css } from 'emotion'
import __css from '@styled-system/css'
import Box from '../Box'
import styleProps from '../config/props'
import { parsePseudoStyles } from './utils'
import { proxyAliases as pxls } from '../config/props/proxy'

/**
 * FWIW, I'm still figuring out how styled sytem works with your deisgn system
 * tokens. So I guess I'll just go back to reading docs :(
 */

const PseudoBox = {
  name: 'PseudoBox',
  inject: ['$theme'],
  props: {
    as: {
      type: [String, Object],
      default: () => 'div'
    },
    ...styleProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const pseudoBoxStylesObject = __css(this.$props)(this.theme)
    const [pseudoStyleObject, baseStyleObject] = parsePseudoStyles(pseudoBoxStylesObject)
    const className = css(__css(pxls(pseudoStyleObject))(this.theme))
    return h(Box, {
      props: {
        ...baseStyleObject
      },
      class: [className]
    }, this.$slots.default)
  }
}

export default PseudoBox
