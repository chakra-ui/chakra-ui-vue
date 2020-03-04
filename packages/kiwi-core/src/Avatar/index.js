import { baseProps } from '../config/props'
import { forwardProps, canUseDOM } from '../utils/'
import useAvatarStyles, { avatarSizes } from './avatar.styles'
import Box from '../Box'

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
 * Avatar badge show's avatar status
 */
export const AvatarBadge = {
  name: 'AvatarBadge',
  inject: ['$theme', '$colorMode'],
  props: {
    size: [String, Number, Array],
    ...baseProps
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
    const borderColorStyle = { light: 'white', dark: 'gray.800' }
    return h(Box, {
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
      }
    })
  }
}

/**
 * Avatar name displays an Avatar with name initials
 */
const AvatarName = {
  name: 'AvatarName',
  props: {
    name: [String, Array],
    size: [String, Array],
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        w: this.size,
        h: this.size,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'medium',
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-label': this.name
      }
    }, [this.name && getInitials(this.name)])
  }
}

/**
 * Default Avatar component shows fallback image of headshots
 */
const DefaultAvatar = {
  name: 'DefaultAvatar',
  props: {
    size: [String, Number, Array],
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        h: this.size,
        w: this.size,
        lineHeight: '1rem',
        ...forwardProps(this.$props)
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
 * Avatar component shows images of headshots
 */
export const Avatar = {
  name: 'Avatar',
  inject: ['$theme', '$colorMode'],
  computed: {
    theme () {
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
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
    this.loadImage(this.src)
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
        return h(Box, {
          props: {
            as: 'img',
            w: '100%',
            h: '100%',
            rounded: 'full',
            objectFit: 'cover',
            alt: this.name
          },
          attrs: {
            src: this.src
          }
        })
      }

      if (this.src && !this.hasLoaded) {
        if (this.name) {
          return h(AvatarName, {
            props: {
              name: this.name,
              size: _size
            }
          })
        } else {
          return h(DefaultAvatar, {
            attrs: {
              'aria-label': this.name
            }
          })
        }
      }
    }

    return h(Box, {
      props: {
        fontSize: fontSize,
        lineHeight: _size,
        ...avatarStyleProps,
        ...forwardProps(this.$props)
      }
    }, [
      renderChildren(),
      this.$slots.default
    ])
  }
}
