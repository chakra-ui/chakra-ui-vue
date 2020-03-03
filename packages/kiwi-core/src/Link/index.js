import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import { forwardProps, kebabify } from '../utils'

/**
 * Issue:
 * - Text decoration on hover not working. Problem source could be with styled components internally
 */

const Link = {
  name: 'Link',
  props: {
    as: {
      type: String,
      default: 'a'
    },
    to: String,
    isDisabled: Boolean,
    isExternal: Boolean,
    onClick: {
      type: Function,
      default: () => null
    },
    innerRef: {
      type: Object,
      default: null
    },
    ...styleProps
  },
  render (h) {
    const externalAttrs = this.isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : null

    return h(PseudoBox, {
      props: {
        as: this.as,
        ...kebabify(this.as) === 'router-link' && { to: this.to },
        transition: `all 0.15s ease-out`,
        cursor: 'pointer',
        textDecoration: 'none',
        outline: 'none',
        _focus: {
          boxShadow: 'outline'
        },
        _hover: { textDecoration: 'underline' },
        _disabled: {
          opacity: '0.4',
          cursor: 'not-allowed',
          textDecoration: 'none'
        },
        ...forwardProps(this.$props)
      },
      attrs: {
        tabIndex: this.isDisabled ? -1 : undefined,
        'aria-disabled': this.isDisabled,
        ...externalAttrs
      }
    }, this.$slots.default)
  }
}

export default Link
