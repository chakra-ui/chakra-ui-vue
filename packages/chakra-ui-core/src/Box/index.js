import { css } from 'emotion'
import __css from '@styled-system/css'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { proxyAliases as pxls } from '../config/props/proxy'

const Box = {
  name: 'Box',
  inject: ['$theme'],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    ...baseProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const { as, ...cleanedStyleProps } = forwardProps(this.$props)
    const boxStylesObject = __css(pxls(cleanedStyleProps))(this.theme)
    const className = css(boxStylesObject)

    return h(as, {
      class: [className]
    }, this.$slots.default)
  }
}

export default Box
