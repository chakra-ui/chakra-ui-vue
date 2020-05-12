/**
 * Hey! Welcome to @chakra-ui/vue Tag
 *
 * Tag component is used for items that need to be
 * labeled, categorized, or organized using keywords
 * that describe them.
 *
 * @see Docs     https://vue.chakra-ui.com/tag
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTag/CTag.js
 */

import styleProps, { baseProps } from '../config/props'
import { css } from 'emotion'
import { useVariantColorWarning, forwardProps } from '../utils'
import useBadgeStyle from '../CBadge/utils/badge.styles'

import CPseudoBox from '../CPseudoBox'
import CIcon from '../CIcon'
import CBox from '../CBox'

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

/**
 * CTagCloseButton component
 *
 * the close button for the tag
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTagCloseButton = {
  name: 'CTagCloseButton',
  props: {
    ...styleProps,
    isDisabled: Boolean
  },
  render (h) {
    return h(CPseudoBox, {
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
        disabled: this.isDisabled,
        'data-chakra-component': 'CTagCloseButton'
      }
    }, [
      h(CIcon, {
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

/**
 * CTagIcon component
 *
 * the icon for the tag
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTagIcon = {
  name: 'CTagIcon',
  props: {
    ...baseProps,
    icon: [String, Object]
  },
  render (h) {
    if (typeof this.icon === 'string') {
      return h(CIcon, {
        class: [css({
          '&:first-child': { marginLeft: 0 },
          '&:last-child': { marginRight: 0 }
        })],
        props: {
          ...this.$props,
          name: this.icon,
          mx: '0.5rem'
        },
        attrs: {
          'data-chakra-component': 'CTagIcon'
        }
      })
    }

    return h(CBox, {
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

/**
 * CTagLabel component
 *
 * the icon for the tag
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTagLabel = {
  name: 'CTagLabel',
  props: baseProps,
  render (h) {
    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        as: 'span',
        isTruncated: true,
        lineHeight: 1.2
      },
      attrs: {
        'data-chakra-component': 'CTagLabel'
      }
    }, this.$slots.default)
  }
}

/**
 * CTag component
 *
 * the wrapper element for the tag's children
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTag = {
  name: 'CTag',
  inject: ['$chakraTheme', '$chakraColorMode'],
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
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
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
    return h(CPseudoBox, {
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
      },
      attrs: {
        'data-chakra-component': 'CTag'
      }
    }, this.$slots.default)
  }
}

export {
  CTag,
  CTagLabel,
  CTagIcon,
  CTagCloseButton
}
