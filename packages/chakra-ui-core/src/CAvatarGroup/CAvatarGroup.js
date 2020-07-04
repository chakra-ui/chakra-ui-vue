/**
 * Hey! Welcome to @chakra-ui/vue AvatarGroup
 *
 * The AvatarGroup component serves a wrapper that stacks multiple Avatars together.
 *
 * @see Docs     https://vue.chakra-ui.com/avatar
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAvatarGroup/CAvatarGroup.js
 */

import { avatarSizes } from '../CAvatar/utils/avatar.styles'
import { forwardProps } from '../utils'

import CFlex from '../CFlex'
import flexProps from '../CFlex/utils/flex.props.js'

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
  inheritAttrs: false,
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    size: [String, Array],
    label: String,
    ...flexProps
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
    const sizeKey = avatarSizes[this.size]
    const _size = this.theme.sizes[sizeKey]
    const fontSize = `calc(${_size} / 2.75)`

    return h(CFlex, {
      props: {
        align: 'center',
        justify: 'center',
        ...forwardProps(this.$props)
      },
      attrs: {
        w: avatarSizes[this.size],
        h: avatarSizes[this.size],
        bg: bg[this.colorMode],
        color: 'inherit',
        rounded: 'full',
        border: '2px',
        borderColor: borderColor[this.colorMode],
        fontSize,
        ...this.$attrs,
        'data-chakra-component': 'CMoreAvatarLabel'
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
    ...flexProps
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
        const { attrs } = node.data
        attrs.ml = isFirstAvatar ? 0 : this.spacing
        attrs.borderColor = this.borderColor || attrs.borderColor
        attrs.zIndex = count - index

        const propsData = node.componentOptions
        propsData.size = this.groupSize
        propsData.showBorder = true

        node.componentOptions.propsData = {
          ...node.componentOptions.propsData,
          ...propsData
        }

        node.data.attrs = {
          ...node.data.attrs,
          ...attrs
        }

        return node
      }

      if (max && index === max) {
        return h(CMoreAvatarLabel, {
          props: {
            size: this.groupSize,
            label: `+${count - max}`
          },
          attrs: {
            ml: this.spacing
          }
        })
      }
    })

    return h(CFlex, {
      props: {
        alignItems: 'center',
        ...forwardProps()
      },
      attrs: {
        zIndex: 0,
        'data-chakra-component': 'CAvatarGroup'
      }
    }, clones)
  }
}

export default CAvatarGroup
