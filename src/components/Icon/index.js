// import styled from 'vue-styled-components'
import { Box } from '../../lib/core/'
import iconPaths from '../../lib/plugin/iconsPaths'
import { forwardProps } from '../../lib/utils'
import { iconStyles } from './icon.utils'
import { baseProps } from '../../lib/config/props'

const fallbackIcon = iconPaths['question-outline']

/**
 * Features:
 * 1) Register custom icons
 * 2) Support Font Awesome icons.
 * 3) Support MD icons.
 *
 * CUSTOM ICONS:
 * - All icons exist as object.
 * - Load them in at project build time
 * - Should be extendable by users.
 * - If "name" prop is provided, search icons config for icon.
 *
 * SUPPORT FONTAWESOME/MDI
 * - Provide Object/Array of Fontawesome components
 * - Iterate over array of components to globally register sprites as components
 * - Accept "use" prop to calculate reference to globally registered component and feed it to Box component
 * - ^^ Use "as" prop to render component passed.
 */

/**
 * The Icon component renders SVGs for visual aid
 */
export default {
  name: 'Icon',
  inject: ['$theme', '$colorMode'],
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
      icon = iconPaths[this.name]
    } else if (this.use) {
      // icon =
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
