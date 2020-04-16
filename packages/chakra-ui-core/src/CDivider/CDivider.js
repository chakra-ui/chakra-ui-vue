/**
 * Hey! Welcome to @chakra-ui/vue Divider
 *
 * Dividers are used to display a thin horizontal or vertical line.
 *
 * @see Docs     https://vue.chakra-ui.com/divider
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CDivider/CDivider.js
 */

import CBox from '../CBox'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

/**
 * CDivider component
 *
 * Creates a horizontal or vertical dividing rule between sibling
 * elements
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/divider
 */
const CDivider = {
  name: 'CDivider',
  props: {
    ...baseProps,
    orientation: {
      type: String,
      default: 'horizontal'
    }
  },
  render (h) {
    const borderProps =
      this.orientation === 'vertical'
        ? { borderLeft: '0.0625rem solid', height: 'auto', mx: 2 }
        : { borderBottom: '0.0625rem solid', width: 'auto', my: 2 }

    return h(CBox, {
      props: {
        ...borderProps,
        as: 'hr',
        border: 0,
        opacity: 0.6,
        borderColor: 'inherit',
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-orientation': this.orientation
      }
    })
  }
}

export default CDivider
