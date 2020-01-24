import { css } from 'emotion'
import __css from '@styled-system/css'
import Box from '../Box'
import { pseudoProps, baseProps } from '../config/props'
import { parsePseudoStyles } from './utils'

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
    const [pseudoStyleObject, baseStyleObject] = parsePseudoStyles(pseudoBoxStylesObject)
    const className = css(pseudoStyleObject)
    return h(Box, {
      props: {
        ...baseStyleObject
      },
      class: [className]
    }, this.$slots.default)
  }
}

export default PseudoBox
