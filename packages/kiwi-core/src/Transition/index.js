import { createElement as h } from '@vue/composition-api'
import anime from 'animejs'

// Easing function from d3-ease: https://github.com/d3/d3-ease/blob/master/src/exp.js
// function expOut(t) {
//   return 1 - Math.pow(2, -10 * t);
// }

const enterEasing = 'spring(1, 100, 50, 0)'
const leaveEasing = 'spring(1, 100, 70, 0)'

const Slide = {
  name: 'Slide',
  props: {
    in: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 250
    },
    finalHeight: {
      type: String,
      default: 'auto'
    },
    from: String,
    finalWidth: String
  },
  setup (props, context) {
    let placements = {
      bottom: {
        maxWidth: '100vw',
        height: props.finalHeight,
        bottom: 0,
        left: 0,
        right: 0
      },
      top: {
        maxWidth: '100vw',
        height: props.finalHeight,
        top: 0,
        left: 0,
        right: 0
      },
      left: {
        ...(props.finalWidth && { maxWidth: props.finalWidth }),
        height: '100vh',
        left: 0,
        top: 0
      },
      right: {
        ...(props.finalWidth && { maxWidth: props.finalWidth }),
        right: 0,
        top: 0,
        height: '100vh'
      }
    }

    let transitionOptions = {
      bottom: {
        offset: '100%',
        transform: y => `translateY(${y})`
      },
      top: {
        offset: '-100%',
        transform: y => `translateY(${y})`
      },
      left: {
        offset: '-100%',
        transform: x => `translateX(${x})`
      },
      right: {
        offset: '100%',
        transform: x => `translateX(${x})`
      }
    }

    console.log(placements)

    const transitions = {
      enter: {
        translateX: ['0%', transitionOptions[props.from]['offset']],
        opacity: 1
        // ...placements[props.from]
      },
      leave: {
        translateX: [transitionOptions[props.from]['offset'], '0%'],
        opacity: 0
      }
    }

    const enter = (el, complete) => {
      const transition = transitions['enter']
      anime({
        targets: el,
        ...transition,
        complete,
        easing: enterEasing
      })
    }

    const leave = (el, complete) => {
      const transition = transitions['leave']
      anime({
        targets: el,
        ...transition,
        complete,
        easing: leaveEasing
      })
    }

    return () => {
      const children = context.slots.default()
      const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
      return h(TransitionElement, {
        props: {
          css: false
        },
        on: {
          enter,
          leave
        }
      }, props.in && context.slots.default())
    }
  }
}

export {
  Slide
}
