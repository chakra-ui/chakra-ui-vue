/**
 * Hey! Welcome to @chakra-ui/vue Number Input
 *
 * The `CNumberInput` component is similar to the `CInput` component,
 * but it has controls for incrementing or decrementing numeric values.
 *
 * @see Docs     https://vue.chakra-ui.com/numberinput
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CNumberInput/CNumberInput.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CNumberInput/accessibility.md
 */

import { isDef, useId, getElement, canUseDOM, wrapEvent } from '../utils'
import { inputProps } from '../CInput/utils/input.props'

import CFlex from '../CFlex'
import CInput from '../CInput'
import CPseudoBox from '../CPseudoBox'
import CIcon from '../CIcon'
import { calculatePrecision, roundToPrecision, preventNonNumberKey } from './utils/numberinput.utils'
import numberInputStyles from './utils/numberinput.styles'

/**
 * CNumberInput component
 *
 * The wrapper that provides context and logic to the components
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CNumberInput = {
  name: 'CNumberInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Number, String],
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
      type: String
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
        size: this.size,
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
        inputId: this._inputId
      }
    },
    isControlled () {
      return isDef(this.value)
    },
    _value: {
      get () {
        return this.isControlled
          ? roundToPrecision(this.value, this._precision)
          : this.innerValue
            ? roundToPrecision(this.innerValue, this._precision)
            : this.innerValue
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
    },
    _inputId () {
      return `number-input-${this.inputId || useId()}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.inputNode = getElement(`#${this._inputId}`, this.$el)
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
     * Get increment factor
     */
    getIncrementFactor (event) {
      let ratio = 1
      if (event.metaKey || event.ctrlKey) {
        ratio = 0.1
      }
      if (event.shiftKey) {
        ratio = 10
      }
      return ratio
    },

    /**
     * Determines whether a value should be converted to number
     * @param {String} value
     */
    shouldConvertToNumber (value) {
      const _value = typeof value !== 'string' ? String(value) : value
      const hasDot = _value.includes('.')
      const hasTrailingZero = _value.substr(_value.length - 1) === '0'
      const hasTrailingDot = _value.substr(_value.length - 1) === '.'
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
      preventNonNumberKey(event)
      if (!this.isInteractive) return

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const ratio = this.getIncrementFactor(event)
        this.handleIncrement(ratio * this.step)
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const ratio = this.getIncrementFactor(event)
        this.handleDecrement(ratio * this.step)
      }

      if (event.key === 'Home') {
        event.preventDefault()
        if (isDef(this.min)) {
          this.updateValue(this.max)
        }
      }

      if (event.key === 'End') {
        event.preventDefault()
        if (isDef(this.max)) {
          this.updateValue(this.min)
        }
      }
    },

    /**
     *
     * @param {Event} event Event object
     * @param {Any} event Value
     */
    handleChange (event, _value) {
      let finalValue
      const { value } = event.target
      if (['', undefined].includes(value)) {
        finalValue = 0
      }
      finalValue = value
      this.updateValue(finalValue)
      this.$emit('change', finalValue, event)
    }
  },
  render (h) {
    const { size, ...styles } = this.$props
    return h(CFlex, {
      props: {
        align: 'stretch'
      },
      attrs: {
        ...styles,
        w: this.isFullWidth ? 'full' : null,
        pos: 'relative',
        'data-chakra-component': 'CNumberInput'
      }
    }, this.$slots.default)
  }
}

/**
 * CNumberInputField component
 *
 * The `input` field itself
 *
 * @extends CInput
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CNumberInputField = {
  name: 'CNumberInputField',
  inheritAttrs: false,
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  props: inputProps,
  render (h) {
    const {
      size, inputId, input: {
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

    return h(CInput, {
      props: {
        ...this.$props,
        isReadOnly,
        isDisabled,
        size,
        value
      },
      attrs: {
        ...this.$attrs,
        id: inputId,
        ...otherInputAttrs,
        'data-chakra-component': 'CNumberInputField'
      },
      on: {
        change: wrapEvent(e => this.$emit('change', e), _onChange)
      },
      nativeOn: {
        input: wrapEvent(e => this.$emit('change', e), _onChange),
        blur: wrapEvent(e => this.$emit('blur', e), _onBlur),
        focus: wrapEvent(e => this.$emit('focus', e), _onFocus),
        keydown: wrapEvent(e => this.$emit('keydown', e), _onKeydown)
      }
    })
  }
}

/**
 * CNumberInputStepper component
 *
 * The wrapper for the input's stepper buttons.
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CNumberInputStepper = {
  name: 'CNumberInputStepper',
  functional: true,
  render (h, { data, slots, ...rest }) {
    return h(CFlex, {
      ...rest,
      props: {
        direction: 'column'
      },
      attrs: {
        width: '24px',
        margin: '1px',
        position: 'absolute',
        right: '0px',
        height: 'calc(100% - 2px)',
        zIndex: 1,
        'data-chakra-component': 'CNumberInputStepper'
      }
    }, slots().default)
  }
}

/**
 * CStepperButton component
 *
 * The composable element for the stepper buttons.
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CStepperButton = {
  name: 'CStepperButton',
  inheritAttrs: false,
  inject: ['$NumberInputContext', '$chakraColorMode'],
  computed: {
    context () {
      return this.$NumberInputContext()
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    const { isDisabled, size } = this.context
    return h(CPseudoBox, {
      attrs: {
        ...this.$attrs,
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
        }),
        'data-chakra-component': 'CStepperButton'
      }
    }, this.$slots.default)
  }
}

/**
 * CNumberIncrementStepper component
 *
 * The button to increment the value of the input.
 *
 * @extends CStepperButton
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CNumberIncrementStepper = {
  name: 'CNumberIncrementStepper',
  inheritAttrs: false,
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  render (h) {
    const children = this.$slots.default ||
      [h(CIcon, {
        props: {
          name: 'triangle-up'
        },
        attrs: {
          height: '0.6em',
          width: '0.6em'
        }
      })]

    const { size, incrementStepper } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(CStepperButton, {
      attrs: {
        ...this.$attrs,
        fontSize: iconSize,
        'data-chakra-component': 'CNumberIncrementStepper'
      },
      nativeOn: incrementStepper
    }, children)
  }
}

/**
 * CNumberIncrementStepper component
 *
 * The button to decrement the value of the input.
 *
 * @extends CStepperButton
 * @see Docs https://vue.chakra-ui.com/numberinput
 */
const CNumberDecrementStepper = {
  name: 'CNumberDecrementStepper',
  inheritAttrs: false,
  inject: ['$NumberInputContext'],
  computed: {
    context () {
      return this.$NumberInputContext()
    }
  },
  render (h) {
    const children = this.$slots.default ||
      [h(CIcon, {
        props: {
          name: 'triangle-down'
        },
        attrs: {
          height: '0.6em',
          width: '0.6em'
        }
      })]

    const { size, decrementStepper } = this.context
    const iconSize = size === 'sm' ? '11px' : '15px'

    return h(CStepperButton, {
      attrs: {
        ...this.$attrs,
        fontSize: iconSize,
        'data-chakra-component': 'CNumberDecrementStepper'
      },
      nativeOn: decrementStepper
    }, children)
  }
}

export {
  CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper
}
