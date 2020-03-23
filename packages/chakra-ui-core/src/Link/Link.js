import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import { forwardProps, kebabify } from '../utils'
import { SNA } from '../config/props/props.types'

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
    to: SNA,
    isDisabled: Boolean,
    isExternal: Boolean,
    ...styleProps
  },
  computed: {
    isRouterLink () {
      return ['router-link', 'nuxt-link'].includes(kebabify(this.as))
    }
  },
  render (h) {
    const externalAttrs = this.isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : null

    return h(PseudoBox, {
      props: {
        as: this.as,
        ...this.isRouterLink && { to: this.to },
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
      },
      on: {
        click: (e) => this.$emit('click', e)
      }
    }, this.$slots.default)
  }
}

export default Link
