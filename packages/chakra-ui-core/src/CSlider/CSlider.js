/**
 * Hey! Welcome to @chakra-ui/vue CSlider
 *
 * The Slider is used to allow users to make
 * selections from a range of values.
 *
 * @see Docs     https://vue.chakra-ui.com/slider
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSlider/CSlider.js
 */

import { isDef, valueToPercent, useId, getElById, createStyledAttrsMixin } from '../utils'
import { percentToValue } from '../utils/transform'
import useSliderStyle from './utils/slider.styles'
import { clampValue, roundValueToStep } from './utils/slider.utils'

/**
 * CSlider component
 *
 * The Slider wrapper component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/slider
 */
const CSlider = {
  name: 'CSlider',
  mixins: [createStyledAttrsMixin('CSlider')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Number,
    defaultValue: Number,
    isDisabled: Boolean,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    ariaLabel: String,
    ariaLabelledBy: String,
    ariaValueText: String,
    orientation: {
      type: String,
      default: 'horizontal'
    },
    getAriaValueText: Function,
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: 'blue'
    },
    name: String,
    id: String
  },
  provide () {
    return {
      $SliderContext: () => this.SliderContext
    }
  },
  data () {
    return {
      innerValue: this.defaultValue || 0,
      trackNode: undefined,
      thumbNode: undefined
    }
  },
  computed: {
    isControlled () {
      return isDef(this.value)
    },
    _value () {
      return this.isControlled ? this.value : this.innerValue
    },
    actualValue () {
      return clampValue(this._value, this.min, this.max)
    },
    trackPercentage () {
      return valueToPercent(this.actualValue, this.min, this.max)
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    _id () {
      return this.id || useId()
    },
    trackId () {
      return `slider-track-${this._id}`
    },
    thumbId () {
      return `slider-thumb-${this._id}`
    },
    sliderStyles () {
      const { rootStyle } = useSliderStyle({
        color: this.color,
        colorMode: this.colorMode,
        size: this.size,
        theme: this.theme,
        trackPercent: this.trackPercentage
      })
      return rootStyle
    },
    componentStyles () {
      return {
        ...this.sliderStyles,
        py: 3
      }
    },
    valueText () {
      return this.getAriaValueText
        ? this.getAriaValueText(this.actualValue)
        : this.ariaValueText
    },
    SliderContext () {
      return {
        trackNode: this.trackNode,
        thumbNode: this.thumbNode,
        onThumbKeyDown: this.handleThumbKeyDown,
        onFocus: e => this.$emit('focus', e),
        trackPercent: this.trackPercentage,
        ariaLabelledBy: this.ariaLabelledBy,
        orientation: this.orientation,
        isDisabled: this.isDisabled,
        size: this.size,
        color: this.color,
        min: this.min,
        max: this.max,
        valueText: this.valueText,
        value: this.actualValue,
        trackId: this.trackId,
        thumbId: this.thumbId
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.trackNode = getElById(this.trackId)
      this.thumbNode = getElById(this.thumbId)
    })
  },
  methods: {
    /**
     * Parses new value returned from slider change event
     * @param {Event} event
     */
    getNewValue (event) {
      if (this.trackNode) {
        const { left, width } = this.trackNode.getBoundingClientRect()
        const { clientX } = event.touches ? event.touches[0] : event

        const diffX = clientX - left
        const percent = diffX / width
        let newValue = percentToValue(percent, this.min, this.max)

        if (this.step) {
          newValue = roundValueToStep(newValue, this.step)
        }
        newValue = clampValue(newValue, this.min, this.max)
        return newValue
      }
    },

    /**
     * Updates current inner value
     * @param {Number} newValue New Value
     */
    updateValue (newValue) {
      if (!this.isControlled) {
        this.innerValue = newValue
      }
      this.$emit('change', newValue)
    },

    /**
     * Handles SliderThumb keydown event
     * @param {Event} event
     */
    handleThumbKeyDown (event) {
      let flag = false
      let newValue
      const tenSteps = (this.max - this.min) / 10

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = this.actualValue - this.step
          flag = true
          break
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = this.actualValue + this.step
          flag = true
          break
        case 'PageDown':
          newValue = this.actualValue - tenSteps
          flag = true
          break
        case 'PageUp':
          newValue = this.actualValue + tenSteps
          flag = true
          break
        case 'Home':
          newValue = this.min
          flag = true
          break
        case 'End':
          newValue = this.max
          flag = true
          break
        default:
          return
      }

      if (flag) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (this.step) {
        newValue = roundValueToStep(newValue, this.step)
      }
      newValue = clampValue(newValue, this.min, this.max)
      this.updateValue(newValue)

      this.$emit('keydown', event)
    },

    /**
     * Handle sliderthumb mouseup event
     */
    handleMouseUp () {
      document.body.removeEventListener('mousemove', this.handleMouseMove)
      document.body.removeEventListener('touchmove', this.handleMouseMove)
      document.body.removeEventListener('mouseup', this.handleMouseUp)
      document.body.removeEventListener('touchend', this.handleMouseUp)
    },

    /**
     * Handles mousedown event for slider
     * @param {Event} event
     */
    handleMouseDown (event) {
      if (this.isDisabled) return
      this.$emit('mousedown', event)
      event.preventDefault()

      const newValue = this.getNewValue(event)
      if (newValue !== this.actualValue) {
        this.updateValue(newValue)
      }

      document.body.addEventListener('mousemove', this.handleMouseMove)
      document.body.addEventListener('touchmove', this.handleMouseMove)
      document.body.addEventListener('mouseup', this.handleMouseUp)
      document.body.addEventListener('touchend', this.handleMouseUp)
      this.thumbNode && this.thumbNode.focus()
    },

    /**
     * Handles slider thumb mousemove event
     * @param {Event} event
     */
    handleMouseMove (event) {
      const newValue = this.getNewValue(event)
      this.updateValue(newValue)
    }
  },
  render (h) {
    const children = this.$slots.default || []

    return h(this.as, {
      class: [this.className],
      attrs: {
        role: 'presentation',
        'aria-disabled': this.isDisabled,
        ...this.computedAttrs
      },
      style: {
        touchAction: 'none'
      },
      on: {
        ...this.computedListeners,
        mousedown: this.handleMouseDown,
        touchstart: this.handleMouseDown,
        mouseleave: this.handleMouseUp,
        touchend: this.handleMouseUp,
        blur: (event) => {
          this.handleMouseUp(event)
          this.$emit('blur', event)
        }
      }
    }, [
      ...children,
      h('input', {
        attrs: {
          type: 'hidden',
          value: this.actualValue,
          name: this.name,
          id: this._id
        }
      })
    ])
  }
}

/**
 * CSliderTrack component
 *
 * The track for the slider component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/slider
 */
const CSliderTrack = {
  name: 'CSliderTrack',
  mixins: [createStyledAttrsMixin('CSliderTrack')],
  inject: ['$SliderContext'],
  computed: {
    context () {
      return this.$SliderContext()
    },
    componentStyles () {
      const { trackStyle } = useSliderStyle({
        ...this.context,
        theme: this.theme,
        colorMode: this.colorMode
      })
      return trackStyle
    }
  },
  render (h) {
    const { isDisabled, trackId } = this.context
    return h(this.as, {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        id: trackId,
        'data-slider-track': '',
        'aria-disabled': isDisabled
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CSliderFilledTrack component
 *
 * The track filler for the slider component
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/slider
 */
const CSliderFilledTrack = {
  name: 'CSliderFilledTrack',
  mixins: [createStyledAttrsMixin('CSliderFilledTrack', true)],
  inject: ['$SliderContext'],
  computed: {
    context () {
      return this.$SliderContext()
    },
    componentStyles () {
      const { filledTrackStyle } = useSliderStyle({
        ...this.context,
        theme: this.theme,
        colorMode: this.colorMode
      })
      return filledTrackStyle
    }
  },
  render (h) {
    const { isDisabled } = this.context
    return h(this.as, {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        'aria-disabled': isDisabled,
        'data-slider-filled-track': ''
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CSliderThumb component
 *
 * The thumb handler for the slider component
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/slider
 */
const CSliderThumb = {
  name: 'CSliderThumb',
  mixins: [createStyledAttrsMixin('CSliderThumb', true)],
  inject: ['$SliderContext'],
  computed: {
    context () {
      return this.$SliderContext()
    },
    componentStyles () {
      const {
        orientation,
        trackPercent,
        size,
        color
      } = this.context

      const { thumbStyle } = useSliderStyle({
        trackPercent,
        orientation,
        color,
        size,
        theme: this.theme,
        colorMode: this.colorMode
      })

      return {
        d: 'flex',
        alignItems: 'center',
        outline: 'none',
        justifyContent: 'center',
        ...thumbStyle
      }
    }
  },
  render (h) {
    const {
      thumbId,
      isDisabled,
      onFocus,
      onThumbKeyDown: onKeyDown,
      min,
      max,
      valueText,
      orientation,
      value,
      ariaLabelledBy
    } = this.context

    return h(this.as, {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        id: thumbId,
        role: 'slider',
        tabIndex: isDisabled ? undefined : 0,
        'aria-disabled': isDisabled,
        'aria-valuemin': min,
        'aria-valuetext': valueText,
        'aria-orientation': orientation,
        'aria-valuenow': value,
        'aria-valuemax': max,
        'aria-labelledby': ariaLabelledBy
      },
      on: {
        ...this.computedListeners,
        keydown: onKeyDown,
        focus: onFocus
      }
    }, this.$slots.default)
  }
}

export default CSlider
export {
  CSliderTrack,
  CSliderFilledTrack,
  CSliderThumb
}
