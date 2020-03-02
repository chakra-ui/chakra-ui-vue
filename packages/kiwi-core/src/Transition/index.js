import { computed, createElement as h } from '@vue/composition-api'
import anime from 'animejs'
import { isUndef, isVueComponent, cloneVNodeElement, cleanChildren } from '../utils'
import Box from '../Box'

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
    initialHeight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 150
    },
    enterEasing: {
      type: String,
      default: enterEasing
    },
    leaveEasing: {
      type: String,
      default: leaveEasing
    },
    finalHeight: Number,
    animateOpacity: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    enter (el, complete) {
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [this.initialScale, 1],
        easing: enterEasing,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        scale: [1, this.initialScale],
        easing: leaveEasing,
        complete
      })
    }
  },
  render (h) {
    let children

    const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
    const clean = cleanChildren(children)
    const clones = clean.map((vnode, index) => {
      return cloneVNodeElement(vnode, {
        key: `scale-${index}`
      }, h)
    })

    return h(TransitionElement, {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          el && el.style.setProperty('will-change', 'opacity, transform')
        },
        enter: this.enter,
        leave: this.leave
      }
    }, clones)
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

const RevealHeight = {
  name: 'RevealHeight',
  props: {
    initialHeight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 150
    },
    enterEasing: {
      type: String,
      default: enterEasing
    },
    leaveEasing: {
      type: String,
      default: leaveEasing
    },
    finalHeight: Number,
    animateOpacity: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    enter (el, complete) {
      this.$emit('enter', el)
      el.style.visibility = 'hidden'
      el.style.height = 'auto'
      const { height } = getComputedStyle(el)
      el.style.height = this.initialHeight || 0

      requestAnimationFrame(() => {
        el.style.visibility = 'visible'
        anime({
          targets: el,
          ...this.animateOpacity && { opacity: [0, 1] },
          height: [this.initialHeight || 0, this.finalHeight || height],
          easing: this.enterEasing,
          duration: this.duration,
          complete
        })
      })
    },
    leave (el, complete) {
      this.$emit('leave', el)
      const { height } = getComputedStyle(el)

      requestAnimationFrame(() => {
        anime({
          targets: el,
          ...this.animateOpacity && { opacity: [1, 0] },
          height: [this.finalHeight || height, this.initialHeight || 0],
          easing: this.leaveEasing,
          duration: this.duration,
          complete
        })
      })
    },
    handleEmit (event, payload) {
      this.$emit(event, payload)
    }
  },
  render (h) {
    const children = this.$slots.default
    if (!children) return h()
    const TransitionElement = children ? children.length > 1 ? 'TransitionGroup' : 'Transition' : 'Transition'
    const clones = children.map((vnode, index) => {
      return cloneVNodeElement(vnode, {
        key: `scale-${index}`
      })
    })

    return h(TransitionElement, {
      props: {
        css: false
      },
      on: {
        beforeEnter: (el) => {
          if (el) {
            el.style.setProperty('will-change', 'opacity, transform')
          }
          this.handleEmit('beforeEnter', el)
        },
        enter: this.enter,
        leave: this.leave,
        afterEnter: (el) => {
          el.style.height = 'auto'
          this.handleEmit('afterEnter', el)
        }
      }
    }, clones)
  }
}

const AnimateHeight = {
  name: 'AnimateHeight',
  props: {
    isOpen: Boolean,
    initialHeight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 150
    },
    enterEasing: {
      type: String,
      default: enterEasing
    },
    leaveEasing: {
      type: String,
      default: leaveEasing
    },
    finalHeight: Number,
    animateOpacity: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      el: undefined
    }
  },
  mounted () {
    this.el = this.getNode(this.$el)
    this.$watch('isOpen', (isOpen) => {
      if (isOpen) this.enter(this.el, () => {})
      else this.leave(this.el, () => {})
    }, {
      immediate: true
    })
  },
  methods: {
    enter (el, complete) {
      this.$emit('enter', el)
      el.style.visibility = 'hidden'
      el.style.height = this.finalHeight || 'auto'
      const { height } = getComputedStyle(el)
      el.style.height = this.initialHeight || 0

      requestAnimationFrame(() => {
        el.style.visibility = 'visible'
        anime({
          targets: el,
          ...this.animateOpacity && { opacity: [0, 1] },
          height: [this.initialHeight || 0, this.finalHeight || height],
          easing: this.enterEasing,
          duration: this.duration,
          complete
        })
      })
    },
    leave (el, complete) {
      this.$emit('leave', el)
      const { height } = getComputedStyle(el)

      requestAnimationFrame(() => {
        anime({
          targets: el,
          ...this.animateOpacity && { opacity: [1, 0] },
          height: [this.finalHeight || height, this.initialHeight || 0],
          easing: this.leaveEasing,
          duration: this.duration,
          complete
        })
      })
    },
    handleEmit (event, payload) {
      this.$emit(event, payload)
    },
    getNode (element) {
      const isVue = isVueComponent(element)
      return isVue ? element.$el : element
    }
  },
  render (h) {
    const children = this.$slots.default
    return h(Box, {
      props: {
        overflow: 'hidden'
      }
    }, children)
  }
}

export {
  Slide,
  Scale,
  SlideIn,
  AnimateHeight,
  RevealHeight
}
