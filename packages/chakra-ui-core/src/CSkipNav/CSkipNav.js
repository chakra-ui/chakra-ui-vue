/**
 * Hey! Welcome to @chakra-ui/vue SkipNavLink
 *
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs     https://vue.chakra-ui.com/skip-nav-link
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSkipNav/CSkipNav.js
 */

import { SNA } from '../config/props.types'
import { createStyledAttrsMixin, mode } from '../utils'
import CBox from '../CBox'

const FALLBACK_ID = 'chakra-skip-nav'

const createSkipNavLinkStyles = (props) => {
  const baseStyles = {
    userSelect: 'none',
    border: '0',
    borderRadius: 'md',
    fontWeight: 'semibold',
    height: '1px',
    width: '1px',
    margin: '-1px',
    padding: '0',
    outline: '0',
    overflow: 'hidden',
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
    _focus: {
      clip: 'auto',
      width: 'auto',
      height: 'auto',
      boxShadow: 'outline',
      padding: '1rem',
      position: 'fixed',
      top: '1.5rem',
      insetStart: '1.5rem',
      bg: mode('white', 'gray.700')
    }
  }

  return { ...baseStyles }
}

/**
 * CSkipNavLink component
 *
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs https://vue.chakra-ui.com/skip-nav
 */
const CSkipNavLink = {
  name: 'CSkipNavLink',
  mixins: [createStyledAttrsMixin('CSkipNavLink')],
  props: {
    id: {
      type: String,
      default: FALLBACK_ID
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    componentStyles () {
      return createSkipNavLinkStyles()
    }
  },
  render (h) {
    return h(
      'a',
      {
        class: this.className,
        attrs: {
          href: `#${this.id}`
        }
      },
      this.$slots.default
    )
  }
}

/**
 * CSkipNavLink component
 *
 * Renders a div as the target for the link.
 *
 * @see Docs https://vue.chakra-ui.com/skip-nav
 */
const CSkipNavContent = {
  name: 'CSkipNavContent',
  mixins: [createStyledAttrsMixin('CSkipNavContent')],
  props: {
    id: {
      type: String,
      default: FALLBACK_ID
    },
    to: SNA
  },
  render (h) {
    return h(
      CBox,
      {
        class: this.className,
        attrs: {
          id: this.id,
          tabIndex: '-1',
          style: {
            outline: 0
          },
          'data-testid': 'chakra-skip-nav'
        }
      },
      this.$slots.default
    )
  }
}

export { CSkipNavLink, CSkipNavContent }
