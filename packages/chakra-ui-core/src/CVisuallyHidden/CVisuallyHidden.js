/**
 * Hey! Welcome to @chakra-ui/vue VisuallyHidden
 *
 * This component is used to visually hide elements that have custom
 * appearance. For example, see the CControlBox.
 *
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CVisuallyHidden/CVisuallyHidden.js
 */

import { css } from 'emotion'

/**
 * CVisuallyHidden component
 *
 * the visually hidden wrapper element
 */
const CVisuallyHidden = {
  name: 'CVisuallyHidden',
  functional: true,
  props: {
    as: {
      type: String,
      default: 'div'
    }
  },
  render (h, { props, data, slots }) {
    const { attrs } = data
    const className = css({
      border: '0px',
      clip: 'rect(0px, 0px, 0px, 0px)',
      height: `${attrs.w || '1px'}`,
      width: `${attrs.h || '1px'}`,
      margin: '-1px',
      padding: '0px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: `${attrs.pos || 'absolute'}`
    })
    return h(props.as, {
      class: [className],
      attrs: {
        ...attrs,
        'data-chakra-component': 'CVisuallyHidden'
      }
    }, slots().default)
  }
}

export default CVisuallyHidden
