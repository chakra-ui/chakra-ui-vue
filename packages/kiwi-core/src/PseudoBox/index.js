import { css } from 'emotion'
import __css from '@styled-system/css'
// import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import Box from '../Box'
import styleProps from '../config/props'
import { parsePseudoStyles } from './utils'
// import { forwardProps } from '../utils'

// const system = compose(
//   layout,
//   color,
//   space,
//   background,
//   border,
//   borderRadius,
//   grid,
//   position,
//   shadow,
//   typography,
//   flexbox,
//   propsConfig
// )

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
    // const cleanedStyleProps = forwardProps(pseudoStyleObject)
    const className = css(__css(pseudoStyleObject)(this.theme))
    // console.log('baseStyleObject', baseStyleObject)
    return h(Box, {
      props: {
        ...baseStyleObject
      },
      class: [className]
    }, this.$slots.default)
  }
}

export default PseudoBox
