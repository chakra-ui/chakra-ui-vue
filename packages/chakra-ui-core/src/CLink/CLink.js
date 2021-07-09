/**
 * Hey! Welcome to @chakra-ui/vue Link
 *
 * `CLink` is an accessible elements used primarily for navigation.
 *
 * @see Docs     https://vue.chakra-ui.com/link
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CLink/CLink.js
 */
import { kebabify, createStyledAttrsMixin } from '../utils'
import { SNA } from '../config/props/props.types'

/**
 * CLink component
 *
 * The anchor / router-link / nuxt-link element
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/link
 */
const CLink = {
  name: 'CLink',
  mixins: [createStyledAttrsMixin('CLink', true)],
  props: {
    as: {
      type: String,
      default: 'a'
    },
    to: SNA,
    isDisabled: Boolean,
    isExternal: Boolean
  },
  computed: {
    isRouterLink () {
      return ['router-link', 'nuxt-link'].includes(kebabify(this.as))
    },
    componentStyles () {
      return {
        transition: 'all 0.15s ease-out',
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
        }
      }
    },
    externalAttrs () {
      return this.isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : null
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      props: {
        ...this.isRouterLink && { to: this.to }
      },
      attrs: {
        tabindex: this.isDisabled ? -1 : undefined,
        'aria-disabled': this.isDisabled,
        ...this.externalAttrs,
        ...this.computedAttrs
      },
      on: {
        click: e => this.$emit('click', e),
        ...this.computedListeners
      }
    }, this.$slots.default)
  }
}

export default CLink
