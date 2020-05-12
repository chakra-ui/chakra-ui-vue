/**
 * Hey! Welcome to @chakra-ui/vue Progess
 *
 * Progress is used to display the progress status
 * for a task that takes a long time or consists of several steps.
 *
 * @see Docs     https://vue.chakra-ui.com/progress
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CProgess/CProgess.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CProgess/accessibility.md
 */

import CBox from '../CBox'
import { generateStripe, valueToPercent, forwardProps } from '../utils'
import { css, keyframes } from 'emotion'
import { baseProps } from '../config/props'

const stripe = keyframes({
  from: { backgroundPosition: '1rem 0' },
  to: { backgroundPosition: '0 0' }
})

const stripeAnimation = css({
  animation: `${stripe} 1s linear infinite`
})

const progressbarSizes = {
  lg: '1rem',
  md: '0.75rem',
  sm: '0.5rem'
}

/**
 * CProgressLabel component
 *
 * The label for the progress component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/progress
 */
const CProgressLabel = {
  name: 'CProgressLabel',
  props: baseProps,
  render (h) {
    return h(CBox, {
      props: {
        textAlign: 'center',
        width: '100%',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CProgressLabel'
      }
    }, this.$slots.default)
  }
}

/**
 * CProgressTrack component
 *
 * The track for the progress component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/progress
 */
const CProgressTrack = {
  name: 'CProgressTrack',
  props: {
    ...baseProps,
    size: [String, Number, Array]
  },
  render (h) {
    return h(CBox, {
      props: {
        pos: 'relative',
        height: progressbarSizes[this.size || 'md'],
        overflow: 'hidden',
        w: '100%',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CProgressTrack'
      }
    }, this.$slots.default)
  }
}

/**
 * CProgressIndicator component
 *
 * The indicator for the progress component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/progress
 */
const CProgressIndicator = {
  name: 'CProgressIndicator',
  props: {
    ...baseProps,
    isIndeterminate: Boolean,
    min: Number,
    max: Number,
    value: Number
  },
  computed: {
    percent () {
      return valueToPercent(this.value, this.min, this.max)
    }
  },
  render (h) {
    return h(CBox, {
      props: {
        height: '100%',
        transition: 'all 0.3s',
        width: `${this.percent}%`,
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-valuemax': this.max,
        'aria-valuemin': this.min,
        'aria-valuenow': this.isIndeterminate ? null : this.value,
        'role': 'progressbar',
        'data-chakra-component': 'CProgressIndicator'
      }
    }, this.$slots.default)
  }
}

/**
 * CProgress component
 *
 * The progress component wrapper
 *
 * @extends CProgressTrack
 * @see Docs https://vue.chakra-ui.com/progress
 */
const CProgress = {
  name: 'CProgress',
  inject: ['$chakraColorMode'],
  props: {
    ...baseProps,
    color: {
      type: String,
      default: 'blue'
    },
    value: {
      type: Number,
      default: 63
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: [String, Array],
      default: 'md'
    },
    hasStripe: Boolean,
    isAnimated: Boolean,
    borderRadius: [String, Array, Number],
    rounded: [String, Array],
    isIndeterminate: Boolean
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    trackColor () {
      return { light: 'gray.100', dark: 'whiteAlpha.300' }
    },
    indicatorColor () {
      return { light: `${this.color}.500`, dark: `${this.color}.200` }
    },
    stripeStyle () {
      return {
        light: generateStripe({}),
        dark: generateStripe({
          color: 'rgba(0,0,0,0.1)'
        })
      }
    },
    __borderRadius () {
      return this.rounded || this.borderRadius
    }
  },
  render (h) {
    const _borderRadius = this.rounded || this.borderRadius

    const trackColor = { light: 'gray.100', dark: 'whiteAlpha.300' }
    const indicatorColor = { light: `${this.color}.500`, dark: `${this.color}.200` }

    const stripeStyle = {
      light: generateStripe({}),
      dark: generateStripe({
        color: 'rgba(0,0,0,0.1)'
      })
    }

    return h(CProgressTrack, {
      props: {
        size: this.size,
        bg: trackColor[this.colorMode],
        borderRadius: _borderRadius,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CProgress'
      }
    }, [
      h(CProgressIndicator, {
        class: [
          this.hasStripe && stripeStyle[this.colorMode],
          this.hasStripe && this.isAnimated && stripeAnimation
        ],
        props: {
          min: this.min,
          max: this.max,
          value: this.value,
          bg: indicatorColor[this.colorMode],
          borderRadius: this.__borderRadius,
          ...this.isIndeterminate && {
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            willChange: 'left, right'
          }
        }
      }, this.$slots.default)
    ])
  }
}

export {
  CProgress,
  CProgressLabel
}
