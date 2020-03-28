import anime from 'animejs'
import { isUndef, isVueComponent, cloneVNodeElement, cleanChildren } from '../utils'
import CBox from '../Box'

const enterEasing = 'spring(1, 100, 50, 0)'
const leaveEasing = 'spring(1, 100, 70, 0)'

const CSlide = {
  name: 'CSlide',
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
    },
    from: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      transitionOptions: {
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
    }
  },
  computed: {
    transform () {
      return this.transitionOptions[this.from].transform
    },
    transitions () {
      return {
        enter: {
          [this.transform]: ['0%', this.transitionOptions[this.from]['offset']],
          opacity: [0, 1]
        },
        leave: {
          [this.transform]: [this.transitionOptions[this.from]['offset'], '0%'],
          opacity: 0
        }
      }
    }
  },
  methods: {
    enter (el, complete) {
      anime({
        targets: el,
        ...this.transitions['enter'],
        complete,
        easing: this.enterEasing
      })
    },

    leave (el, complete) {
      anime({
        targets: el,
        ...this.transitions['leave'],
        complete,
        easing: this.leaveEasing
      })
    }
  },
  render (h) {
    if (isUndef(this.from)) {
      console.error('[Chakra]: The Slide component expected prop "from" but none was passed.')
      return () => null
    }

    const children = this.$slots.default
    const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
    return h(TransitionElement, {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          el && el.style.setProperty('will-change', 'opacity, transform')
        },
        enter: this.enter,
        leave: this.enter
      }
    }, this.$slots.default)
  }
}

const CScale = {
  name: 'CScale',
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
        easing: this.enterEasing,
        duration: this.duration,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        scale: [1, this.initialScale],
        easing: this.leaveEasing,
        duration: this.duration,
        complete
      })
    }
  },
  render (h) {
    let finalChildren
    const children = this.$slots.default || [h(null)]

    if (children.length > 1) {
      const clean = cleanChildren(children)
      finalChildren = clean.map((vnode, index) => {
        return cloneVNodeElement(vnode, {
          key: `scale-${index}`
        }, h)
      })
    } else {
      finalChildren = children
    }

    const TransitionElement = finalChildren.length > 1 ? 'TransitionGroup' : 'Transition'

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
    }, finalChildren)
  }
}

const CFade = {
  name: 'CFade',
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
        easing: this.enterEasing,
        duration: this.duration,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        easing: this.leaveEasing,
        duration: this.duration,
        complete
      })
    }
  },
  render (h) {
    let finalChildren
    const children = this.$slots.default || [h(null)]

    if (children.length > 1) {
      const clean = cleanChildren(children)
      finalChildren = clean.map((vnode, index) => {
        return cloneVNodeElement(vnode, {
          key: `scale-${index}`
        }, h)
      })
    } else {
      finalChildren = children
    }

    const TransitionElement = finalChildren.length > 1 ? 'TransitionGroup' : 'Transition'

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
    }, finalChildren)
  }
}

const CSlideIn = {
  name: 'CSlideIn',
  props: {
    offset: {
      type: String,
      default: '10px'
    },
    duration: {
      type: Number,
      default: 150
    }
  },
  methods: {
    enter (el, complete) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [this.offset, '0px'],
        easing: enterEasing,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        translateY: ['0px', this.offset],
        easing: leaveEasing,
        complete
      })
    }
  },
  render (h) {
    let finalChildren
    const children = this.$slots.default || [h(null)]

    if (children.length > 1) {
      const clean = cleanChildren(children)
      finalChildren = clean.map((vnode, index) => {
        return cloneVNodeElement(vnode, {
          key: `scale-${index}`
        }, h)
      })
    } else {
      finalChildren = children
    }

    const TransitionElement = finalChildren.length > 1 ? 'TransitionGroup' : 'Transition'

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
    }, finalChildren)
  }
}

const CRevealHeight = {
  name: 'CRevealHeight',
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

const CAnimateHeight = {
  name: 'CAnimateHeight',
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
    return h(CBox, {
      props: {
        overflow: 'hidden'
      }
    }, children)
  }
}

export {
  CSlide,
  CScale,
  CSlideIn,
  CAnimateHeight,
  CRevealHeight,
  CFade
}
