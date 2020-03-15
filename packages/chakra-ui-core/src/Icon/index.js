import { css } from 'emotion'
import Box from '../Box'
import iconPaths from '../lib/internal-icons'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import { iconProps } from './icon.props'

const fallbackIcon = iconPaths['question-outline']

const Svg = {
  name: 'IconSvg',
  props: {
    ...iconProps,
    ...baseProps
  },
  render (h) {
    const className = css`
      flex-shrink: 0;
      backface-visibility: hidden;
      &:not(:root) {
        overflow: hidden;
      }
    `
    return h(Box, {
      props: {
        as: 'svg',
        ...forwardProps(this.$props)
      },
      class: [className]
    }, this.$slots.default)
  }
}

/**
 * The Icon component renders SVGs for visual aid
 */
export default {
  name: 'Icon',
  inject: ['$theme', '$icons'],
  props: {
    ...iconProps,
    ...baseProps
  },
  render (h) {
    let icon, viewBox
    if (this.name) {
      icon = this.$icons[this.name]
    } else {
      console.warn(`[Chakra]: You need to provide the "name" or "use" prop to for the Icon component`)
    }

    if (!icon) {
      icon = fallbackIcon
    }

    viewBox = icon.viewBox || '0 0 24 24'

    return h(Svg, {
      props: {
        as: 'svg',
        w: this.size,
        h: this.size,
        color: this.color,
        d: 'inline-block',
        verticalAlign: 'middle',
        ...forwardProps(this.$props)
      },
      attrs: {
        viewBox,
        role: 'presentation',
        focusable: false
      },
      domProps: {
        innerHTML: icon.path
      }
    })
  }
}
