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

import { css } from '@emotion/css'
import { useVariantColorWarning, extractListeners } from '../utils'
import useBadgeStyle from '../CBadge/utils/badge.styles'

import CPseudoBox from '../CPseudoBox'
import CIcon from '../CIcon'
import CBox from '../CBox'
import CText from '../CText'

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
  functional: true,
  props: {
    isDisabled: Boolean
  },
  render (h, { data, props, listeners, ...rest }) {
    // Event listeners
    const nonNativeEvents = {
      click: (e) => {
        const emitClick = listeners.click
        if (emitClick) {
          emitClick(e)
        }
      }
    }
    const { native, nonNative } = extractListeners({ listeners }, nonNativeEvents)

    return h(CPseudoBox, {
      ...rest,
      props: {
        as: 'button'
      },
      on: nonNative,
      nativeOn: native,
      attrs: {
        ...data.attrs,
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
        },
        disabled: props.isDisabled,
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
  functional: true,
  props: {
    icon: [String, Object]
  },
  render (h, { props, data, ...rest }) {
    const childrenClassName = css({
      '&:first-child': { marginLeft: 0 },
      '&:last-child': { marginRight: 0 }
    })

    if (typeof props.icon === 'string') {
      return h(CIcon, {
        ...rest,
        class: [childrenClassName],
        props: {
          name: props.icon
        },
        attrs: {
          ...data.attrs,
          mx: '0.5rem',
          'data-chakra-component': 'CTagIcon'
        }
      })
    }

    return h(CBox, {
      ...rest,
      class: [childrenClassName],
      props: {
        as: props.icon
      },
      attrs: {
        ...data.attrs,
        mx: '0.5rem',
        color: 'currentColor',
        'data-chakra-component': 'CTagIcon'
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
  functional: true,
  render (h, { props, data, slots, ...rest }) {
    return h(CText, {
      ...rest,
      props: {
        as: 'span',
        isTruncated: true
      },
      attrs: {
        lineHeight: 1.2,
        ...data.attrs,
        'data-chakra-component': 'CTagLabel'
      }
    }, slots().default)
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
  functional: true,
  props: {
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
  render (h, { injections, props, slots, data, ...rest }) {
    const theme = injections.$chakraTheme()
    const colorMode = injections.$chakraColorMode()

    useVariantColorWarning(theme, 'Tag', props.variantColor)

    const tagStyles = useBadgeStyle({
      variant: props.variant,
      color: props.variantColor,
      colorMode,
      theme
    })
    const sizeStyles = tagSizes[props.size]

    return h(CPseudoBox, {
      ...rest,
      attrs: {
        display: 'inline-flex',
        alignItems: 'center',
        minH: 6,
        maxW: '100%',
        rounded: 'md',
        fontWeight: 'medium',
        ...(data.attrs || {}),
        ...sizeStyles,
        ...tagStyles,
        'data-chakra-component': 'CTag'
      }
    }, slots().default)
  }
}

export {
  CTag,
  CTagLabel,
  CTagIcon,
  CTagCloseButton
}
