import { AnimateHeight } from '../Transition'
import Box from '../Box'

const Collapse = {
  name: 'Collapse',
  props: {
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

    return h(AnimateHeight, {
      props: {
        duration: this.duration,
        enterEasing: this.easing,
        leaveEasing: this.easing,
        startingHeight: this.startingHeight,
        finalHeight: this.endingHeight,
        animateOpacity: this.animateOpacity
      }
    }, children ? [h(Box, { props: { overflow: 'hidden' } }, children)] : null)
  }
}

export default Collapse
