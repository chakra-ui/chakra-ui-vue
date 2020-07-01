/**
 * Hey! Welcome to @chakra-ui/vue Button
 *
 * Button component is used to trigger an action or event, such as
 * submitting a form, opening a Dialog, canceling an action, or
 * performing a delete operation
 *
 * @see Docs     https://vue.chakra-ui.com/button
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CButton/CButton.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CButton/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#button
 */

import { createStyledAttrsMixin } from '../utils'

import CBox from '../CBox'
import CSpinner from '../CSpinner'
import CIcon from '../CIcon'
import createButtonStyles, { setIconSizes } from './utils/button.styles'
import { buttonProps } from './utils/button.props'

/**
 * CButtonIcon component
 *
 * The icon component inside a button
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/button
 */
const CButtonIcon = {
  mixins: [createStyledAttrsMixin('CButtonIcon', true)],
  props: {
    icon: {
      type: [String, Object]
    },
    size: {
      type: [String, Number]
    }
  },
  render (h) {
    if (typeof this.icon === 'string') {
      return h(CIcon, {
        class: this.className,
        props: {
          name: this.icon
        },
        attrs: {
          color: 'currentColor',
          focusable: false,
          ...setIconSizes(this.$props),
          ...this.computedAttrs
        }
      })
    } else {
      return h(CBox, {
        class: this.className,
        props: {
          as: this.icon
        },
        attrs: {
          ...setIconSizes(this.$props),
          color: 'currentColor',
          'data-custom-icon': true,
          ...this.computedAttrs,
          focusable: false
        }
      })
    }
  }
}

/**
 * CButton component
 *
 * The Button component is an accessible rich component that does what a button does :)
 *
 * @see Docs https://vue.chakra-ui.com/button
 */
const CButton = {
  mixins: [createStyledAttrsMixin('CButton', true)],
  props: buttonProps,
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    componentStyles () {
      return createButtonStyles({
        color: this.variantColor,
        variant: this.variant,
        theme: this.theme,
        ripple: this.ripple,
        colorMode: this.colorMode,
        size: this.size || 'md'
      })
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      attrs: this.computedAttrs,
      on: {
        click: $event => this.$emit('click', $event)
      }
    }, [
      this.leftIcon && h(CButtonIcon, {
        props: {
          icon: this.leftIcon
        },
        attrs: {
          mr: this.iconSpacing,
          mb: 'px',
          icon: this.leftIcon,
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      }),
      this.isLoading && h(CSpinner, {
        attrs: {
          position: this.loadingText ? 'relative' : 'absolute',
          color: 'currentColor',
          mb: '-4px',
          mr: this.loadingText ? this.iconSpacing : 0,
          size: '1em'
        }
      }),
      this.isLoading ? this.loadingText || h(CBox, {
        props: {
          as: 'span'
        },
        attrs: {
          opacity: 0
        }
      }, this.$slots.default) : this.$slots.default,
      this.rightIcon && h(CButtonIcon, {
        props: {
          icon: this.rightIcon
        },
        attrs: {
          ml: this.iconSpacing,
          mb: 'px',
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      })
    ])
  }
}

export default CButton
