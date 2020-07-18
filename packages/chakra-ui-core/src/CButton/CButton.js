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

import styleProps from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
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
  name: 'CButtonIcon',
  props: {
    icon: {
      type: [String, Object]
    },
    size: {
      type: [String, Number]
    },
    ...styleProps
  },
  render (h) {
    if (typeof this.icon === 'string') {
      return h(CIcon, {
        props: {
          focusable: false,
          name: this.icon,
          color: 'currentColor',
          ...setIconSizes(this.$props),
          ...forwardProps(this.$props)
        },
        attrs: {
          'data-chakra-component': 'CButtonIcon'
        }
      })
    } else {
      return h(CBox, {
        props: {
          as: this.icon,
          focusable: false,
          color: 'currentColor',
          ...setIconSizes(this.$props),
          ...forwardProps(this.$props)
        },
        attrs: {
          'data-custom-icon': true,
          'data-chakra-component': 'CButtonIcon'
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
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/button
 */
const CButton = {
  name: 'CButton',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    ...buttonProps,
    ...styleProps,
    to: [String, Object]
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    }
  },
  render (h) {
    const buttonStyles = createButtonStyles({
      color: this.variantColor,
      variant: this.variant,
      theme: this.theme,
      ripple: this.ripple,
      colorMode: this.colorMode,
      size: this.size || 'md'
    })

    return h(CPseudoBox, {
      props: {
        as: this.as,
        to: this.to,
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'md',
        fontWeight: '700',
        border: 'none',
        rounded: 'md',
        width: this.isFullWidth ? 'full' : undefined,
        ...buttonStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        type: this.type,
        tabIndex: 0,
        disabled: this.isDisabled || this.isLoading,
        'aria-disabled': this.isDisabled || this.isLoading,
        dataActive: this.isActive ? 'true' : undefined,
        'data-chakra-component': 'CButton'
      },
      nativeOn: {
        click: $event => this.$emit('click', $event)
      }
    }, [
      this.leftIcon && h(CButtonIcon, {
        props: {
          mr: this.iconSpacing,
          mb: 'px',
          icon: this.leftIcon,
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      }),
      this.isLoading && h(CSpinner, {
        props: {
          position: this.loadingText ? 'relative' : 'absolute',
          color: 'currentColor',
          mb: '-4px',
          mr: this.loadingText ? this.iconSpacing : 0,
          size: '1em'
        }
      }),
      this.isLoading ? this.loadingText || h(CBox, {
        props: {
          as: 'span',
          opacity: 0
        }
      }, this.$slots.default) : this.$slots.default,
      this.rightIcon && h(CButtonIcon, {
        props: {
          ml: this.iconSpacing,
          mb: 'px',
          icon: this.rightIcon,
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      })
    ])
  }
}

export default CButton
