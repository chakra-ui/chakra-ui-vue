import { Box } from '../../lib/core/'
import iconPaths from '../../lib/plugin/iconsPaths'
import { forwardProps } from '../../lib/utils'
import { iconStyles } from './icon.utils'
import { baseProps } from '../../lib/config/props'

const fallbackIcon = iconPaths['question-outline']

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
      validator: (value) => value.match(/^(fas|fal|fad)$/)
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

    // Evaluate icon size
    const iconSize = iconStyles({
      size: this.size,
      theme: this.$theme
    })

    return h(Box, {
      props: {
        as: 'svg',
        color: this.color,
        d: 'inline-block',
        verticalAlign: 'middle',
        ...iconSize,
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
