import styled from 'vue-styled-components'
import Box from '../Box'
import iconPaths from '../lib/internal-icons'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'

const fallbackIcon = iconPaths['question-outline']

const Svg = styled(Box)`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }
`

/**
 * The Icon component renders SVGs for visual aid
 */
export default {
  name: 'Icon',
  inject: ['$theme', '$icons'],
  props: {
    name: {
      type: [String, Array]
    },
    use: {
      type: [String, Array],
      required: false
    },
    pack: {
      type: String,
      required: false,
      default: 'fas',
      validator: value => value.match(/^(fas|fal|fad)$/)
    },
    size: {
      type: [String, Number, Array],
      default: '1em'
    },
    color: {
      type: [String, Array],
      default: 'currentColor'
    },
    ...baseProps
  },
  render (h) {
    let icon, viewBox
    if (this.name) {
      icon = this.$icons[this.name]
    } else {
      console.warn(`[KiwiIcon]: You need to provide the "name" or "use" prop to for the Icon component`)
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
