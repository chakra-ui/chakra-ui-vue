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
import CBox from '../CBox'
import { extractListeners } from '../utils'

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
  functional: true,
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
  render (h, { slots, props, data, listeners, ...rest }) {
    // Get children
    const children = slots().default

    // Handle events
    const nonNativeEvents = {
      start: (e) => {
        const emitStart = listeners.start
        if (emitStart) {
          emitStart('start', e)
        }
      },
      finish: (e) => {
        const emitFinish = listeners.finish
        if (emitFinish) {
          emitFinish('finish', e)
        }
      }
    }
    const { native, nonNative } = extractListeners({ listeners }, nonNativeEvents)

    return h(CAnimateHeight, {
      ...rest,
      props: {
        isOpen: props.isOpen,
        duration: props.duration,
        enterEasing: props.easing,
        leaveEasing: props.easing,
        initialHeight: props.startingHeight,
        finalHeight: props.endingHeight,
        animateOpacity: props.animateOpacity
      },
      on: nonNative,
      nativeOn: native,
      attrs: {
        'data-chakra-component': 'CCollapse'
      }
    }, [h(CBox, {
      props: {
        as: props.as
      },
      attrs: data.attrs
    }, children)])
  }
}

export default CCollapse
