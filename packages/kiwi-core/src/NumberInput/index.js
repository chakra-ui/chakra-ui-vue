import { baseProps } from '../config'
import Flex from '../Flex'
import styleProps from '../config/props'
import Input from '../Input'
import PseudoBox from '../PseudoBox'
import Icon from '../Icon'
import numberInputStyles from './numberinput.styles'
import { isDef, useId, getElement, canUseDOM, wrapEvent } from '../utils'
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
      incrementEvents: {},
      decrementEvents: {},
      clickEvent: canUseDOM && !!document.documentElement.ontouchstart
        ? 'touchstart'
        : 'mousedown',
      incrementStepperProps: undefined,
      decrementStepperProps: undefined,
      incrementTimerId: null,
      decrementTimerId: null
    }
  },
  computed: {
    NumberInputContext () {
      return {
        set: this.set,
        value: this._value,
        isReadOnly: this.isReadOnly,
        isInvalid: this.isInvalid,
        isDisabled: this.isDisabled,
        isFocused: this.isFocused,
        incrementStepper: this.incrementStepperProps,
        decrementStepper: this.decrementStepperProps,
        incrementButton: {
          nativeOn: {
            click: () => this.handleIncrement()
          },
          attrs: {
            'aria-label': 'add',
            ...(this.keepWithinRange & {
              disabled: this.value === this.max,
              'aria-disabled': this.value === this.max
            })
          }
        },
        decrementButton: {
          nativeOn: {
            click: () => this.handleDecrement()
          },
          attrs: {
            'aria-label': 'subtract',
            ...(this.keepWithinRange & {
              disabled: this.value === this.min,
              'aria-disabled': this.value === this.min
            })
          }
        },
        input: {
          value: this._value,
          onChange: this.handleChange,
          onKeydown: this.handleKeydown,
          onFocus: () => {
            this.isFocused = true
          },
          onBlur: () => {
            this.isFocused = false
            if (this.clampValueOnBlur) {
              this.validateAndClamp()
            }
          },
          role: 'spinbutton',
          type: 'text',
          'aria-valuemin': this.min,
          'aria-valuemax': this.max,
          'aria-disabled': this.isDisabled,
          'aria-valuenow': this.value,
          'aria-invalid': this.isInvalid || this.isOutOfRange,
          ...(this.getAriaValueText && { 'aria-valuetext': this.ariaValueText }),
          readOnly: this.isReadOnly,
          disabled: this.isDisabled,
          autoComplete: 'off'
        },
        hiddenLabel: {
          'aria-live': 'polite',
          text: this.getAriaValueText ? this.ariaValueText : this._value,
          style: {
            position: 'absolute',
            clip: 'rect(0px, 0px, 0px, 0px)',
            height: 1,
            width: 1,
            margin: -1,
            whiteSpace: 'nowrap',
            border: 0,
            overflow: 'hidden',
            padding: 0
          }
        },
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
    },
    isOutOfRange () {
      return this._value > this.max || this.value < this.min
    },
    ariaValueText () {
      return this.getAriaValueText ? this.getAriaValueText(this._value) : null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.inputNode = getElement(`#${this.inputId}`, this.$el)
    })

    // ================================= INCREMENT WATCHER
    this.$watch(vm => [vm.incrementPressed, vm._value], () => {
      if (this.incrementTimerId) clearTimeout(this.incrementTimerId)
      if (this.incrementPressed) {
        this.incrementTimerId = setTimeout(this.handleIncrement, 200)
      } else {
        clearTimeout(this.incrementTimerId)
      }
    })

    const startIncrement = () => {
      this.handleIncrement()
      this.incrementPressed = true
    }
    const stopIncrement = () => {
      this.incrementPressed = false
    }

    this.incrementStepperProps = {
      [this.clickEvent]: startIncrement,
      mouseup: stopIncrement,
      mouseleave: stopIncrement,
      touchend: stopIncrement
    }

    // ================================= DECREMENT WATCHER
    this.$watch(vm => [vm.decrementPressed, vm._value], () => {
      if (this.decrementTimerId) clearTimeout(this.decrementTimerId)
      if (this.decrementPressed) {
        this.decrementTimerId = setTimeout(this.handleDecrement, 200)
      } else {
        clearTimeout(this.decrementTimerId)
      }
    })

    const startDecrement = () => {
      this.handleDecrement()
      this.decrementPressed = true
    }
    const stopDecrement = () => {
      this.decrementPressed = false
    }

    this.decrementStepperProps = {
      [this.clickEvent]: startDecrement,
      mouseup: stopDecrement,
      mouseleave: stopDecrement,
      touchend: stopDecrement
    }
  },
  methods: {

    /**
     * Validates and clamps input values
     */
    validateAndClamp () {
      const maxExists = isDef(this.max)
      const minExists = isDef(this.min)

      if (maxExists && this._value > this.max) {
        this.updateValue(this.max)
      }

      if (minExists && this._value < this.min) {
        this.updateValue(this.min)
      }
    },

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
      this.$emit('increment', nextValue)
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
      this.$emit('decrement', nextValue)
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
    handleChange (value, event) {
      this.$emit('change', value, event)
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
    const { size, inputId, input: {
      value,
      onBlur: _onBlur,
      onFocus: _onFocus,
      onChange: _onChange,
      onKeydown: _onKeydown,
      disabled: isDisabled,
      readOnly: isReadOnly,
      ...otherInputAttrs
    }
    } = this.context

    return h(Input, {
      props: {
        ...this.$props,
        isReadOnly,
        isDisabled,
        size,
        value
      },
      attrs: {
        id: inputId,
        ...otherInputAttrs
      },
      nativeOn: {
        input: wrapEvent((e) => this.$emit('change', e), _onChange),
        blur: wrapEvent((e) => this.$emit('blur', e), _onBlur),
        focus: wrapEvent((e) => this.$emit('focus', e), _onFocus),
        keydown: wrapEvent((e) => this.$emit('keydown', e), _onKeydown)
      }
    })
  }
}

/**
 * NumberInputStepper component
 */
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

/**
 * StepperButton component
 */
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

    const { size, incrementStepper } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(StepperButton, {
      props: {
        ...this.$props,
        fontSize: iconSize
      },
      nativeOn: incrementStepper
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

    const { size, decrementStepper } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(StepperButton, {
      props: {
        ...this.$props,
        fontSize: iconSize
      },
      nativeOn: decrementStepper
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
