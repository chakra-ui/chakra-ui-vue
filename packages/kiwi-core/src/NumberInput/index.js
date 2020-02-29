import { baseProps } from '../config'
import Flex from '../Flex'
import styleProps from '../config/props'
import Input from '../Input'
import PseudoBox from '../PseudoBox'
import Icon from '../Icon'
import numberInputStyles from './numberinput.styles'
import { isDef, useId, getElement, canUseDOM } from '../utils'
import { calculatePrecision, roundToPrecision } from './utils'

/**
 * NumberInput component
 */
const NumberInput = {
  name: 'NumberInput',
  props: {
    ...baseProps,
    value: Number,
    defaultValue: Number,
    focusInputOnChange: {
      type: Boolean,
      default: true
    },
    clampValueOnBlur: {
      type: Boolean,
      default: true
    },
    keepWithinRange: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: Number,
    getAriaValueText: Function,
    isReadOnly: Boolean,
    isInvalid: Boolean,
    isDisabled: Boolean,
    isFullWidth: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    inputId: {
      type: String,
      default: `number-input-${useId()}`
    }
  },
  provide () {
    return {
      $NumberInputContext: () => this.NumberInputContext
    }
  },
  data () {
    return {
      innerValue: this.defaultValue || null,
      isFocused: false,
      prevNexValue: null,
      inputNode: undefined,
      incrementPressed: false,
      decrementPressed: false,
      incrementSpeed: 200,
      decrementSpeed: 200,
      incrementEvents: {}
    }
  },
  computed: {
    NumberInputContext () {
      return {
        set: this.set,
        value: this.value,
        onChange: this.onChange,
        defaultValue: this.defaultValue,
        focusInputOnChange: this.focusInputOnChange,
        clampValueOnBlur: this.clampValueOnBlur,
        keepWithinRange: this.keepWithinRange,
        min: this.min,
        max: this.max,
        step: this.step,
        precision: this.precision,
        getAriaValueText: this.getAriaValueText,
        isReadOnly: this.isReadOnly,
        isInvalid: this.isInvalid,
        isDisabled: this.isDisabled,
        handleBlur: this.handleBlur,
        handleFocus: this.handleFocus,
        handleKeydown: this.handleKeydown,
        handleChange: this.handleChange,
        inputId: this.inputId
      }
    },
    isControlled () {
      return isDef(this.value)
    },
    _value: {
      get () {
        return this.isControlled ? this.value : this.innerValue
      },
      set (val) {
        if (!this.defaultValue) {
          let nextValue = this.defaultValue
          if (this.keepWithinRange) {
            nextValue = Math.max(Math.min(nextValue, this.max), this.min)
          }
          nextValue = roundToPrecision(nextValue, this._precision)
          this.innerValue = nextValue
        }
        this.innerValue = val
      }
    },
    defaultPrecision () {
      return Math.max(calculatePrecision(this.step), 0)
    },
    _precision () {
      return this.precision || this.defaultPrecision
    },
    isInteractive () {
      return !(this.isReadOnly || this.isDisabled)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.inputNode = getElement(`#${this.inputId}`, this.$el)
    })

    // =========== Long press interactions handlers ============
    const clickEvent =
      canUseDOM && !!document.documentElement.ontouchstart
        ? 'onTouchStart'
        : 'onMouseDown'

    // INCREMENT ==========================================
    let incrementTimerId
    this.$watch(vm => [vm.incrementPressed, vm.handleIncrement, vm.incrementSpeed], () => {
      if (incrementTimerId) clearTimeout(incrementTimerId)
      if (this.incrementPressed) {
        incrementTimerId = setTimeout(this.handleIncrement, this.incrementSpeed)
      } else {
        clearTimeout(incrementTimerId)
      }
    })

    const incrementStart = () => {
      this.incrementCallback && this.incrementCallback()
      this.incrementPressed = true
    }
    const incrementStop = () => {
      this.incrementPressed = false
    }

    this.incrementEvents = {
      [clickEvent]: incrementStart,
      onMouseUp: incrementStop,
      onMouseLeave: incrementStop,
      onTouchEnd: incrementStop
    }
    // =====================================================

    // DECREMENT ==========================================
    let decrementTimerId
    this.$watch(vm => [vm.incrementPressed, vm.handleDecrement, vm.decrementSpeed], () => {
      if (decrementTimerId) clearTimeout(decrementTimerId)
      if (this.decrementPressed) {
        decrementTimerId = setTimeout(this.handleDecrement, this.decrementSpeed)
      } else {
        clearTimeout(decrementTimerId)
      }
    })
    const decrementStart = () => {
      this.incrementCallback && this.incrementCallback()
      this.incrementPressed = true
    }
    const decrementStop = () => {
      this.incrementPressed = false
    }

    this.incrementEvents = {
      [clickEvent]: decrementStart,
      onMouseUp: decrementStop,
      onMouseLeave: decrementStop,
      onTouchEnd: decrementStop
    }
    // =====================================================
  },
  methods: {
    /**
     * Determines whether a value should be converted to number
     * @param {String} value
     */
    shouldConvertToNumber (value) {
      const hasDot = value.indexOf('.') > -1
      const hasTrailingZero = value.substr(value.length - 1) === '0'
      const hasTrailingDot = value.substr(value.length - 1) === '.'
      if (hasDot && hasTrailingZero) return false
      if (hasDot && hasTrailingDot) return false
      return true
    },

    /**
     * Updates the current input value
     * @param {Number|String} nextValue value
     */
    updateValue (nextValue) {
      if (this.prevNextValue === nextValue) return

      const shouldConvert = this.shouldConvertToNumber(nextValue)
      const converted = shouldConvert ? +nextValue : nextValue

      if (!this.isControlled) {
        this._value = converted
      }

      this.$emit('change', converted)

      this.prevNextValue = nextValue
    },

    /**
     * Handles value increment
     * @param {Number} step Value to be incremented
     */
    handleIncrement (step = this.step) {
      if (!this.isInteractive) return
      let nextValue = Number(this._value) + Number(step)

      if (this.keepWithinRange) {
        nextValue = Math.min(nextValue, this.max)
      }

      nextValue = roundToPrecision(nextValue, this._precision)
      this.updateValue(nextValue)

      this.focusInput()
    },

    /**
     * Handles value decrement
     * @param {Number} step Value to be decremented
     */
    handleDecrement (step = this.step) {
      if (!this.isInteractive) return
      let nextValue = Number(this._value) - Number(step)

      if (this.keepWithinRange) {
        nextValue = Math.max(nextValue, this.min)
      }

      nextValue = roundToPrecision(nextValue, this._precision)
      this.updateValue(nextValue)

      this.focusInput()
    },

    /**
     * Focus NumberInput element
     */
    focusInput () {
      const _this = this
      requestAnimationFrame(() => {
        _this.inputNode && _this.inputNode.focus()
      })
    },

    /**
     * Handles "blur" event
     * @param {Event} event Event object
     */
    handleBlur (event) {
      this.$emit('blur', event)
    },

    /**
     * Handles "focus" event
     * @param {Event} event Event object
     */
    handleFocus (event) {
      this.$emit('focus', event)
    },

    /**
     * Handles "keydown" event
     * @param {Event} event Event object
     */
    handleKeydown (event) {
      this.$emit('keydown', event)
    },

    /**
     *
     * @param {Event} event Event object
     * @param {Any} value Value
     */
    handleChange (event) {
      this.$emit('change', event, event.target.value)
    },

    /**
     * Sets the value of any component instance property.
     * This function is to be passed down to context so that consumers
     * can mutate context values with out doing it directly.
     * Serves as a temporary fix until Vue 3 comes out
     * @param {String} prop Component instance property
     * @param {Any} value Property value
     */
    set (prop, value) {
      this[prop] = value
      return this[prop]
    }
  },
  render (h) {
    const { size, ...styles } = this.$props
    return h(Flex, {
      props: {
        ...styles,
        align: 'stretch',
        w: this.isFullWidth ? 'full' : null,
        pos: 'relative'
      }
    }, this.$slots.default)
  }
}

/**
 * NumberInputField component
 */
const NumberInputField = {
  name: 'NumberInputField',
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  props: styleProps,
  render (h) {
    const { size, inputId, handleBlur, handleFocus, handleChange, handleKeydown, isDisabled, isReadOnly, ...inputProps } = this.context

    return h(Input, {
      props: {
        ...this.$props,
        isReadOnly,
        isDisabled,
        size,
        ...inputProps
      },
      attrs: {
        id: inputId
      },
      nativeOn: {
        input: (e) => {
          handleChange(e)
          this.$emit('change', e, e.target.value)
        },
        blur: (e) => {
          handleBlur(e)
          this.$emit('blur', e)
        },
        focus: (e) => {
          handleFocus(e)
          this.$emit('focus', e)
        },
        keydown: (e) => {
          handleKeydown(e)
          this.$emit('keydown', e)
        }
      }
    })
  }
}

const NumberInputStepper = {
  name: 'NumberInputStepper',
  props: baseProps,
  render (h) {
    return h(Flex, {
      props: {
        ...this.$props,
        direction: 'column',
        width: '24px',
        margin: '1px',
        position: 'absolute',
        right: '0px',
        height: 'calc(100% - 2px)',
        zIndex: 1
      }
    }, this.$slots.default)
  }
}

const StepperButton = {
  name: 'StepperButton',
  inject: ['$NumberInputContext', '$colorMode'],
  props: styleProps,
  computed: {
    context () {
      return this.$NumberInputContext()
    },
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const { isDisabled, size } = this.context
    return h(PseudoBox, {
      props: {
        ...this.$props,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        transition: 'all 0.3s',
        userSelect: 'none',
        pointerEvents: isDisabled ? 'none' : undefined,
        lineHeight: 'normal',
        ...numberInputStyles({
          colorMode: this.colorMode,
          size
        })
      }
    }, this.$slots.default)
  }
}

const NumberIncrementStepper = {
  name: 'NumberIncrementStepper',
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  props: styleProps,
  render (h) {
    const children = this.$slots.default ||
      [h(Icon, {
        props: {
          name: 'triangle-up',
          height: '0.6em',
          width: '0.6em'
        }
      })]

    const { size } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(StepperButton, {
      props: {
        ...this.$props,
        fontSize: iconSize
      }
    }, children)
  }
}

const NumberDecrementStepper = {
  name: 'NumberDecrementStepper',
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  props: styleProps,
  render (h) {
    const children = this.$slots.default ||
      [h(Icon, {
        props: {
          name: 'triangle-down',
          height: '0.6em',
          width: '0.6em'
        }
      })]

    const { size } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(StepperButton, {
      props: {
        ...this.$props,
        fontSize: iconSize
      }
    }, children)
  }
}

export {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
}
