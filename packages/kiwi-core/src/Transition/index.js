import { computed, createElement as h } from '@vue/composition-api'
import anime from 'animejs'
import { isUndef } from '../utils'

/**
 * Renders transition component's children
 * @param {Vue.PropOptions} props Current VNode props
 * @param {Vue.RenderContext} context Current VNode's render context
 * @param {{enter: Function, leave: Function}} handlers Transition event handlers
 * @returns {Vue.VNode} Children
 */
function renderChildren (props, context, { enter, leave }) {
  const children = context.slots.default()
  const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
  return h(TransitionElement, {
    props: {
      css: false
    },
    on: {
      beforeEnter (el) {
        el && el.style.setProperty('will-change', 'opacity, transform')
      },
      enter,
      leave
    }
  }, props.in && context.slots.default())
}

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
    from: {
      type: String,
      validator: (value) => value.match(/^(top|right|bottom|left)$/)
    },
    finalWidth: String,
    delay: {
      type: Number,
      default: 0
    },
    easing: String
  },
  setup (props, context) {
    if (isUndef(props.from)) {
      console.error('[Chakra]: The Slide component expected prop "from" but none was passed.')
      return () => null
    }

    let transitionOptions = {
      bottom: {
        offset: '-100%',
        transform: 'translateY'
      },
      top: {
        offset: '100%',
        transform: 'translateY'
      },
      left: {
        offset: '100%',
        transform: 'translateX'
      },
      right: {
        offset: '-100%',
        transform: 'translateX'
      }
    }

    const transform = computed(() => transitionOptions[props.from].transform)
    const transitions = computed(() => {
      return {
        enter: {
          [transform.value]: ['0%', transitionOptions[props.from]['offset']],
          opacity: [0, 1]
        },
        leave: {
          [transform.value]: [transitionOptions[props.from]['offset'], '0%'],
          opacity: 0
        }
      }
    })

    const enter = (el, complete) => {
      anime({
        targets: el,
        ...transitions.value['enter'],
        complete,
        easing: props.easing || enterEasing
      })
    }

    const leave = (el, complete) => {
      anime({
        targets: el,
        ...transitions.value['leave'],
        complete,
        easing: props.easing || leaveEasing
      })
    }

    return () => renderChildren(props, context, { enter, leave })
  }
}

const Scale = {
  name: 'Scale',
  props: {
    in: Boolean,
    initialScale: {
      type: Number,
      default: 0.97
    },
    duration: {
      type: Number,
      default: 150
    }
  },
  setup (props, context) {
    const enter = (el, complete) => {
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [props.initialScale, 1],
        easing: enterEasing,
        complete
      })
    }

    const leave = (el, complete) => {
      anime({
        targets: el,
        opacity: [1, 0],
        scale: [1, props.initialScale],
        easing: leaveEasing,
        complete
      })
    }

    return () => renderChildren(props, context, { enter, leave })
  }
}

const SlideIn = {
  name: 'SlideIn',
  props: {
    in: Boolean,
    offset: {
      type: String,
      default: '10px'
    },
    duration: {
      type: Number,
      default: 150
    }
  },
  setup (props, context) {
    const enter = (el, complete) => {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [props.offset, '0px'],
        easing: enterEasing,
        complete
      })
    }

    const leave = (el, complete) => {
      anime({
        targets: el,
        opacity: [1, 0],
        translateY: ['0px', props.offset],
        easing: leaveEasing,
        complete
      })
    }

    return () => renderChildren(props, context, { enter, leave })
  }
}

export {
  Slide,
  Scale,
  SlideIn
}
