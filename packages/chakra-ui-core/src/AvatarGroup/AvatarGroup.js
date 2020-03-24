import Flex from '../Flex'
import { avatarSizes } from '../Avatar/avatar.styles'
import { forwardProps } from '../utils'

/**
 * For excess avatars we dispay this to show the remaining unrendered avatars
 */
const MoreAvatarLabel = {
  name: 'MoreAvatarLabel',
  inject: ['$theme', '$colorMode'],
  extends: Flex,
  props: {
    size: [String, Array],
    label: String
  },
  computed: {
    theme () {
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const borderColor = { light: '#fff', dark: 'gray.800' }
    const bg = { light: 'gray.200', dark: 'whiteAlpha.400' }

    const theme = this.theme
    const sizeKey = avatarSizes[this.size]
    const _size = theme.sizes[sizeKey]
    const fontSize = `calc(${_size} / 2.75)`

    return h(Flex, {
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
        fontSize: fontSize,
        ...forwardProps(this.$props)
      }
    }, this.label)
  }
}

const AvatarGroup = {
  name: 'AvatarGroup',
  extends: Flex,
  props: {
    size: {
      type: [Number, String, Array],
      default: 'md'
    },
    borderColor: [String, Array],
    max: [Number, String, Array],
    spacing: {
      type: [Number, String, Array],
      default: -3
    }
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
        const { propsData } = node.componentOptions
        propsData['ml'] = isFirstAvatar ? 0 : this.spacing
        propsData['size'] = this.size
        propsData['showBorder'] = true
        propsData['borderColor'] = this.borderColor || propsData['borderColor']
        propsData['zIndex'] = count - index
        return node
      }

      if (max && index === max) {
        return h(MoreAvatarLabel, {
          props: {
            size: this.size,
            ml: this.spacing,
            label: `+${count - max}`
          }
        })
      }
    })

    // Drop size, borderColor, max, spacing props from final rendered AvatarGroup props for consistency.
    const { size, borderColor, max: _max, spacing, ...rest } = this.$props

    return h(Flex, {
      props: {
        alignItems: 'center',
        zIndex: 0,
        ...forwardProps(rest)
      }
    }, clones)
  }
}

export default AvatarGroup
