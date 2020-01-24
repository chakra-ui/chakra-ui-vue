import { css } from 'emotion'
import __css from '@styled-system/css'
import Box from '../Box'
import { pseudoProps, baseProps } from '../config/props'
import { parsePseudoStyles } from './utils'
import { forwardProps } from '../utils'

const PseudoBox = {
  name: 'PseudoBox',
  inject: ['$theme'],
  props: {
    as: {
      type: String,
      default: 'div'
    },
    ...pseudoProps,
    ...baseProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const pseudoBoxStylesObject = __css(this.$props)(this.theme)
    const parsedStyleObject = parsePseudoStyles(pseudoBoxStylesObject)
    const className = css(parsedStyleObject)

    return h(Box, {
      props: {
        as: this.as,
        ...forwardProps(this.$props)
      },
      class: [className]
    }, this.$slots.default)
  }
}

export default PseudoBox
