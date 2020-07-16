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
  functional: true,
  inject: ['$chakraColorMode', '$chakraTheme'],
  props: {
    size: [String, Array],
    label: String,
    ...flexProps
  },
  render (h, { injections, props, data, ...rest }) {
    const { size, label, ...avatarProps } = props
    const colorMode = injections.$chakraColorMode()
    const theme = injections.$chakraTheme()
    const borderColor = { light: '#fff', dark: 'gray.800' }
    const bg = { light: 'gray.200', dark: 'whiteAlpha.400' }
    const sizeKey = avatarSizes[size]
    const _size = theme.sizes[sizeKey]
    const fontSize = `calc(${_size} / 2.75)`

    return h(CFlex, {
      ...rest,
      props: forwardProps(avatarProps),
      attrs: {
        align: 'center',
        justify: 'center',
        h: avatarSizes[size],
        w: avatarSizes[size],
        bg: bg[colorMode],
        color: 'inherit',
        rounded: 'full',
        border: '2px',
        borderColor: borderColor[colorMode],
        fontSize,
        ...data.attrs,
        'data-chakra-component': 'CMoreAvatarLabel'
      }
    }, label)
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
  functional: true,
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
  render (h, { slots, props, data, ...rest }) {
    // Get the number of slot nodes inside AvatarGroup
    const children = slots().default.filter(e => e.tag)
    const count = children.length
    const max = parseInt(props.max, 10)

    // Apply styles to slot VNodes.
    const clones = children.map((node, index) => {
      const isFirstAvatar = index === 0
      if (!props.max || (max && index < max)) {
        // Change VNode component options
        const { attrs } = node.data
        attrs.ml = isFirstAvatar ? 0 : props.spacing
        attrs.borderColor = props.borderColor || attrs.borderColor
        attrs.zIndex = count - index

        const propsData = node.componentOptions
        propsData.size = props.groupSize
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
            size: props.groupSize,
            label: `+${count - max}`
          },
          attrs: {
            ml: props.spacing
          }
        })
      }
    })

    return h(CFlex, {
      ...rest,
      props: {
        alignItems: 'center',
        ...forwardProps(props)
      },
      attrs: {
        zIndex: 0,
        ...data.attrs,
        'data-chakra-component': 'CAvatarGroup'
      }
    }, clones)
  }
}

export default CAvatarGroup
