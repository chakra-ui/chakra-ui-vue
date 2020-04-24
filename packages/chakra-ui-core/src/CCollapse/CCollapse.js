/**
 * Hey! Welcome to @chakra-ui/vue Collapse
 *
 * The Collapse component is used to create regions of content
 * that can expand/collapse with a simple animation. It helps to hide
 * content that's not immediately relevant to the user.
 *
 * @see Docs     https://vue.chakra-ui.com/collapse
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCollapse/CCollapse.js
 */

import { CAnimateHeight } from '../CTransition'
import { forwardProps } from '../utils'

import CBox from '../CBox'

/**
 * CCollapse component
 *
 * Create regions of content that can expand/collapse
 * with a simple animation.
 *
 * @extends CAnimateHeight
 * @see Docs https://vue.chakra-ui.com/collpse
 */
const CCollapse = {
  name: 'CCollapse',
  extends: CBox,
  props: {
    isOpen: Boolean,
    duration: {
      type: Number,
      default: 250
    },
    easing: {
      type: String,
      default: 'easeInOutSine'
    },
    startingHeight: Number,
    endingHeight: Number,
    animateOpacity: {
      type: Boolean,
      default: true
    }
  },
  render (h) {
    const children = this.$slots.default

    return h(CAnimateHeight, {
      props: {
        isOpen: this.isOpen,
        duration: this.duration,
        enterEasing: this.easing,
        leaveEasing: this.easing,
        initialHeight: this.startingHeight,
        finalHeight: this.endingHeight,
        animateOpacity: this.animateOpacity
      },
      on: {
        enter: (e) => this.$emit('start', e),
        leave: (e) => this.$emit('finish', e)
      },
      attrs: {
        'data-chakra-component': 'CCollapse'
      }
    }, [h(CBox, {
      props: {
        ...forwardProps(this.$props),
        overflow: 'hidden'
      }
    }, children)])
  }
}

export default CCollapse
