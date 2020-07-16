/**
 * Hey! Welcome to @chakra-ui/vue Icon
 *
 * CIcon is used for rendering icons.
 *
 * Use the <CIcon> component to easily render <svg> icons.
 *
 * @see Docs     https://vue.chakra-ui.com/icon
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CIcon/CIcon.js
 */

import { css } from 'emotion'
import iconPaths from '../lib/internal-icons'
import { createStyledAttrsMixin } from '../utils'
import { iconProps } from './utils/icon.props'

const fallbackIcon = iconPaths['question-outline']

const Svg = {
  name: 'ChakraIconSvg',
  mixins: [createStyledAttrsMixin('ChakraIconSvg')],
  props: iconProps,
  computed: {
    svgClassName () {
      return css`
        flex-shrink: 0;
        backface-visibility: hidden;
        &:not(:root) {
          overflow: hidden;
        }
      `
    }
  },
  render (h) {
    return h('svg', {
      class: [this.svgClassName, this.className],
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

/**
 * CIcon component
 *
 * CIcon is used for rendering icons.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/icon
 */
const CIcon = {
  name: 'CIcon',
  mixins: [createStyledAttrsMixin('CIcon')],
  inject: ['$chakraIcons'],
  computed: {
    icon () {
      let icon
      if (this.name) {
        icon = this.$chakraIcons[this.name]
      } else {
        console.warn('[Chakra]: You need to provide the "name" or "use" prop to for the Icon component')
      }
      if (!icon) {
        icon = fallbackIcon
      }

      return icon
    },
    viewBox () {
      return this.icon.viewBox || '0 0 24 24'
    }
  },
  props: iconProps,
  render (h) {
    return h(Svg, {
      class: this.className,
      attrs: {
        w: this.size,
        h: this.size,
        color: this.color,
        d: 'inline-block',
        verticalAlign: 'middle',
        viewBox: this.viewBox,
        role: 'presentation',
        focusable: false,
        ...this.computedAttrs
      },
      domProps: {
        innerHTML: this.icon.path
      }
    })
  }
}

export default CIcon
