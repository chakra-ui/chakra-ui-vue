import { baseProps } from '../config'
import { isDef, valueToPercent, useId, getElById, forwardProps } from '../utils'
import { clampValue, roundValueToStep } from './utils/slider.utils'
import useSliderStyle from './utils/slider.styles'
import { percentToValue } from '../utils/transform'
import styleProps from '../config/props'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'

const CSlider = {
  name: 'CSlider',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    ...baseProps,
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
        onFocus: (e) => this.$emit('focus', e),
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

        let diffX = clientX - left
        let percent = diffX / width
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

      let newValue = this.getNewValue(event)
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
      let newValue = this.getNewValue(event)
      this.updateValue(newValue)
    }
  },
  render (h) {
    const children = this.$slots.default || []

    return h(CBox, {
      props: {
        ...this.$props,
        ...this.sliderStyles,
        py: 3
      },
      attrs: {
        role: 'presentation',
        'aria-disabled': this.isDisabled
      },
      style: {
        touchAction: 'none'
      },
      nativeOn: {
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
 * SliderTrack compoennt
 */
const CSliderTrack = {
  name: 'CSliderTrack',
  inject: ['$SliderContext', '$chakraTheme', '$chakraColorMode'],
  props: baseProps,
  computed: {
    context () {
      return this.$SliderContext()
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    trackStyles () {
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
    return h(CBox, {
      props: {
        ...this.trackStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        id: trackId,
        'data-slider-track': '',
        'aria-disabled': isDisabled
      }
    }, this.$slots.default)
  }
}

/**
 * SliderFilledTrack component
 */
const CSliderFilledTrack = {
  name: 'CSliderFilledTrack',
  inject: ['$SliderContext', '$chakraTheme', '$chakraColorMode'],
  props: styleProps,
  computed: {
    context () {
      return this.$SliderContext()
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    filledTrackStyles () {
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
    return h(CPseudoBox, {
      props: {
        ...this.filledTrackStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-disabled': isDisabled,
        'data-slider-filled-track': ''
      }
    }, this.$slots.default)
  }
}

/**
 * SliderThumb component
 */
const CSliderThumb = {
  name: 'CSliderThumb',
  inject: ['$SliderContext', '$chakraTheme', '$chakraColorMode'],
  props: baseProps,
  computed: {
    context () {
      return this.$SliderContext()
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
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
      trackPercent,
      size,
      color,
      value,
      ariaLabelledBy
    } = this.context

    const { thumbStyle } = useSliderStyle({
      trackPercent,
      orientation,
      color,
      size,
      theme: this.theme,
      colorMode: this.colorMode
    })

    return h(CPseudoBox, {
      props: {
        d: 'flex',
        alignItems: 'center',
        outline: 'none',
        justifyContent: 'center',
        ...thumbStyle,
        ...forwardProps(this.$props)
      },
      attrs: {
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
      nativeOn: {
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
