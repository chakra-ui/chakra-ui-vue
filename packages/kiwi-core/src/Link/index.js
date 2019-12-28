import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import { createElement as h } from '@vue/composition-api'
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
      type: HTMLElement,
      default: null
    },
    ...styleProps
  },
  setup (props, context) {
    const externalAttrs = props.isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : null

    return () => {
      return h(PseudoBox, {
        props: {
          as: props.as,
          ...kebabify(props.as) === 'router-link' && { to: props.to },
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
          ...forwardProps(props)
        },
        attrs: {
          tabIndex: props.isDisabled ? -1 : undefined,
          'aria-disabled': props.isDisabled,
          ...externalAttrs
        },
        ref: props.innerRef
      }, context.slots.default())
    }
  }
}

export default Link
