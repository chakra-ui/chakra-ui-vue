import { CAnimateHeight } from '../Transition'
import CBox from '../Box'
import { forwardProps } from '../utils'

const CCollapse = {
  name: 'CCollapse',
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
