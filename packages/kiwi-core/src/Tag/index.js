import styleProps, { baseProps } from '../config/props'
import { css } from 'emotion'
import PseudoBox from '../PseudoBox'
import Icon from '../Icon'
import Box from '../Box'
import { useVariantColorWarning, forwardProps } from '../utils'
import useBadgeStyle from '../Badge/badge.styles'

const tagSizes = {
  sm: {
    minH: 6,
    minW: 6,
    fontSize: 'sm',
    px: 2
  },
  md: {
    minH: '1.75rem',
    minW: '1.75rem',
    fontSize: 'sm',
    px: 2
  },
  lg: {
    minH: 8,
    minW: 8,
    px: 3
  }
}

const TagCloseButton = {
  name: 'TagCloseButton',
  props: {
    ...styleProps,
    isDisabled: Boolean
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        ...this.$props,
        as: 'button',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        rounded: 'full',
        size: '1.25rem',
        outline: 'none',
        opacity: '0.5',
        mr: -1,
        _disabled: {
          opacity: '40%',
          cursor: 'not-allowed',
          boxShadow: 'none'
        },
        _focus: {
          boxShadow: 'outline',
          bg: 'rgba(0, 0, 0, 0.14)'
        },
        _hover: {
          opacity: '0.8'
        },
        _active: {
          opacity: '1'
        }
      },
      attrs: {
        disabled: this.isDisabled
      }
    }, [
      h(Icon, {
        props: {
          size: '18px',
          name: 'small-close'
        },
        attrs: {
          focusable: false
        }
      })
    ])
  }
}

const TagIcon = {
  name: 'TagIcon',
  props: {
    ...baseProps,
    icon: [String, Object]
  },
  render (h) {
    if (typeof this.icon === 'string') {
      return h(Icon, {
        class: [css({
          '&:first-child': { marginLeft: 0 },
          '&:last-child': { marginRight: 0 }
        })],
        props: {
          ...this.$props,
          name: this.icon,
          mx: '0.5rem'
        }
      })
    }

    return h(Box, {
      class: [css({
        '&:first-child': { marginLeft: 0 },
        '&:last-child': { marginRight: 0 }
      })],
      props: {
        ...this.$props,
        as: this.icon,
        mx: '0.5rem',
        color: 'currentColor'
      }
    })
  }
}

const TagLabel = {
  name: 'TagLabel',
  props: baseProps,
  render (h) {
    return h(Box, {
      ...forwardProps(this.$props),
      as: 'span',
      isTruncated: true,
      lineHeight: 1.2
    }, this.$slots.default)
  }
}

const Tag = {
  name: 'Tag',
  inject: ['$theme', '$colorMode'],
  props: {
    ...styleProps,
    variant: {
      type: String,
      default: 'subtle'
    },
    size: {
      type: String,
      default: 'lg'
    },
    variantColor: {
      type: String,
      default: 'gray'
    }
  },
  computed: {
    theme () {
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
    },
    styleProps () {
      useVariantColorWarning(this.theme, 'Tag', this.variantColor)
      return useBadgeStyle({
        variant: this.variant,
        color: this.variantColor,
        colorMode: this.colorMode,
        theme: this.theme
      })
    },
    sizeProps () {
      return tagSizes[this.size]
    }
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        display: 'inline-flex',
        alignItems: 'center',
        minH: 6,
        maxW: '100%',
        rounded: 'md',
        fontWeight: 'medium',
        ...forwardProps(this.$props),
        ...this.sizeProps,
        ...this.styleProps
      }
    }, this.$slots.default)
  }
}

export {
  Tag,
  TagLabel,
  TagIcon,
  TagCloseButton
}
