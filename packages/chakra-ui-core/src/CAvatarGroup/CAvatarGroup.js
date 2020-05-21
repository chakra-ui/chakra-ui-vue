/**
 * Hey! Welcome to @chakra-ui/vue AvatarGroup
 *
 * The AvatarGroup component serves a wrapper that stacks multiple Avatars together.
 *
 * @see Docs     https://vue.chakra-ui.com/avatar
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAvatarGroup/CAvatarGroup.js
 */

import { avatarSizes } from '../CAvatar/utils/avatar.styles'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

import CFlex from '../CFlex'

/**
 * CMoreAvatarLabel component
 *
 * For excess avatars, the CMoreAvatarLabel displays an indicator of the surplus avatars
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CMoreAvatarLabel = {
  name: 'CMoreAvatarLabel',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    size: [String, Array],
    label: String,
    ...baseProps
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    const borderColor = { light: '#fff', dark: 'gray.800' }
    const bg = { light: 'gray.200', dark: 'whiteAlpha.400' }

    const theme = this.theme
    const sizeKey = avatarSizes[this.size]
    const _size = theme.sizes[sizeKey]
    const fontSize = `calc(${_size} / 2.75)`

    return h(CFlex, {
      props: {
        w: avatarSizes[this.size],
        h: avatarSizes[this.size],
        bg: bg[this.colorMode],
        color: 'inherit',
        rounded: 'full',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px',
        borderColor: borderColor[this.colorMode],
        fontSize,
        ...forwardProps(this.$props)
      }
    }, this.label)
  }
}

/**
 * CAvatarGroup component
 *
 * Clones all CAvatar children and stacks them together.
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CAvatarGroup = {
  name: 'CAvatarGroup',
  props: {
    groupSize: {
      type: [Number, String, Array],
      default: 'md'
    },
    borderColor: [String, Array],
    max: [Number, String, Array],
    spacing: {
      type: [Number, String, Array],
      default: -3
    },
    ...baseProps
  },
  render (h) {
    // Get the number of slot nodes inside AvatarGroup
    const children = this.$slots.default.filter(e => e.tag)
    const count = children.length
    const max = parseInt(this.max, 10)

    // Apply styles to slot VNodes.
    const clones = children.map((node, index) => {
      const isFirstAvatar = index === 0
      if (!this.max || (max && index < max)) {
        // Change VNode component options
        if (node.componentOptions && node.componentOptions.propsData) {
          const { propsData } = node.componentOptions
          propsData.ml = isFirstAvatar ? 0 : this.spacing
          propsData.size = this.groupSize
          propsData.showBorder = true
          propsData.borderColor = this.borderColor || propsData.borderColor
          propsData.zIndex = count - index
        }
        return node
      }

      if (max && index === max) {
        return h(CMoreAvatarLabel, {
          props: {
            size: this.groupSize,
            ml: this.spacing,
            label: `+${count - max}`
          }
        })
      }
    })

    return h(CFlex, {
      props: {
        alignItems: 'center',
        zIndex: 0,
        ...forwardProps(this.$props)
      }
    }, clones)
  }
}

export default CAvatarGroup
