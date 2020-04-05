/**
 * Hey! Welcome to @chakra-ui/vue Avatar
 *
 * The Avatar component is used to represent user, and displays the profile picture,
 * initials or fallback icon.
 *
 * @see Docs     https://vue.chakra-ui.com/avatar
 * @ally Avatar  The CAvatar component by default applies the `alt` attribute from the `src` prop. It also can be overwritten by passing the `alt` attribute
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAvatar/CAvatar.js
 */

import { baseProps } from '../config/props'
import { forwardProps, canUseDOM } from '../utils'
import useAvatarStyles, { avatarSizes } from './utils/avatar.styles'

import CBox from '../CBox'

/**
 * @description Generate Avatar initials from name string
 * @param {String} name
 * @returns {String} Avatar Initials
 */
const getInitials = (name) => {
  let [firstName, lastName] = name.split(' ')

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    return firstName.charAt(0)
  }
}

/**
 * CAvatarBadge component
 *
 * Avatar badge used to indicate the avatar status
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CAvatarBadge = {
  name: 'CAvatarBadge',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    size: [String, Number, Array],
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
    const borderColorStyle = { light: 'white', dark: 'gray.800' }
    return h(CBox, {
      props: {
        w: this.size,
        h: this.size,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(25%, 25%)',
        bottom: '0',
        right: '0',
        border: '0.2em solid',
        borderColor: borderColorStyle[this.colorMode],
        rounded: 'full',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CAvatarBadge'
      }
    })
  }
}

/**
 * CAvatarName component
 *
 * Avatar name component displays the fallback initials fallback
 * for the Avatar in case the image fails to load, and before the
 * image loads.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CAvatarName = {
  name: 'CAvatarName',
  props: {
    name: [String, Array],
    size: [String, Array],
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        w: this.size,
        h: this.size,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'medium',
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-label': this.name,
        'data-chakra-component': 'CAvatarName'
      }
    }, [this.name && getInitials(this.name)])
  }
}

/**
 * CDefaultAvatar component
 *
 * Default Avatar component shows fallback image of headshots.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CDefaultAvatar = {
  name: 'CDefaultAvatar',
  props: {
    size: [String, Number, Array],
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        h: this.size,
        w: this.size,
        lineHeight: '1rem',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CDefaultAvatar'
      },
      domProps: {
        innerHTML: `
        <svg fill="#fff" viewBox="0 0 128 128" role="img">
          <g>
            <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
            <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
          </g>
        </svg>
      `
      }
    })
  }
}

/**
 * CAvatar component
 *
 * Avatar component shows images of headshots
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/avatar
 */
const CAvatar = {
  name: 'CAvatar',
  inject: ['$chakraTheme', '$chakraColorMode'],
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  props: {
    size: {
      type: String,
      default: 'md'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    name: [String, Array],
    src: [String, Array],
    borderColor: [String],
    ...baseProps
  },
  data () {
    return {
      image: undefined,
      hasLoaded: false
    }
  },
  created () {
    // Should only invoke window.Image in the browser.
    if (process.browser) {
      this.loadImage(this.src)
    }
  },
  methods: {
    loadImage (src) {
      if (!canUseDOM) {
        return
      }

      const image = new window.Image()
      image.src = src

      image.onload = event => {
        this.hasLoaded = true
        this.$emit('load', event)
      }

      image.onError = event => {
        this.hasLoaded = false
        this.$emit('error', event)
      }
    }
  },
  render (h) {
    const avatarStyleProps = useAvatarStyles({
      size: this.size,
      name: this.name,
      showBorder: this.showBorder,
      borderColor: this.borderColor,
      theme: this.theme,
      colorMode: this.colorMode
    })

    const theme = this.theme
    const sizeKey = avatarSizes[this.size]
    const _size = theme.sizes[sizeKey]
    const fontSize = `calc(${_size} / 2.5)`

    /**
     * @description Render child nodes for avatar
     * @returns {Vue.VNode}
     */
    const renderChildren = () => {
      if (this.src && this.hasLoaded) {
        return h(CBox, {
          props: {
            as: 'img',
            w: '100%',
            h: '100%',
            rounded: 'full',
            objectFit: 'cover',
          },
          attrs: {
            alt: this.name,
            src: this.src
          }
        })
      }

      if (this.src && !this.hasLoaded) {
        if (this.name) {
          return h(CAvatarName, {
            props: {
              name: this.name,
              w: _size,
              h: _size
            }
          })
        } else {
          return h(CDefaultAvatar, {
            props: {
              w: '100%',
              h: '100%'
            },
            attrs: {
              'aria-label': this.name,
            }
          })
        }
      }
    }

    const { size, ...avatarStyles } = avatarStyleProps

    return h(CBox, {
      props: {
        fontSize: fontSize,
        lineHeight: _size,
        verticalAlign: 'top',
        w: size,
        h: size,
        ...avatarStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CAvatar'
      }
    }, [
      renderChildren(),
      this.$slots.default
    ])
  }
}

export {
  CAvatar,
  CAvatarBadge
}
