import { AnimateHeight } from '../Transition'
import Box from '../Box'

const Collapse = {
  name: 'Collapse',
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

    return h(AnimateHeight, {
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
      }
    }, [h(Box, { props: { overflow: 'hidden' } }, children)])
  }
}

export default Collapse
