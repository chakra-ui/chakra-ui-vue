import styleProps, { baseProps } from '../config/props'
import { isDef, getElement, useId, forwardProps } from '../utils'

import CBox from '../Box'
import CPseudoBox from '../CPseudoBox'

const sharedEditableProps = {
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'inherit',
  bg: 'transparent',
  transition: 'all 0.2s',
  borderRadius: 'md',
  px: '3px',
  mx: '-3px'
}

const CEditable = {
  name: 'CEditable',
  props: {
    ...baseProps,
    value: String,
    defaultValue: String,
    isDisabled: Boolean,
    startWithEditView: Boolean,
    selectAllOnFocus: {
      type: Boolean,
      default: true
    },
    submitOnBlur: {
      type: Boolean,
      default: true
    },
    isPreviewFocusable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Click to edit...'
    }
  },
  provide () {
    return {
      $EditableContext: () => this.EditableContext
    }
  },
  data () {
    return {
      isEditing: this.startWithEditView && !this.isDisabled,
      innerValue: this.defaultValue || '',
      previousValue: this._value,
      inputNode: null
    }
  },
  computed: {
    isControlled () {
      return isDef(this.value)
    },
    _value () {
      return this.isControlled ? this.value : this.innerValue
    },
    editableId () {
      return `editable-${useId()}`
    },
    EditableContext () {
      return {
        editableId: this.editableId,
        isEditing: this.isEditing,
        isDisabled: this.isDisabled,
        placeholder: this.placeholder,
        onRequestEdit: this.onRequestEdit,
        submitOnBlur: this.submitOnBlur,
        isPreviewFocusable: this.isPreviewFocusable,
        value: this._value,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange,
        onSubmit: this.handleSubmit,
        onCancel: this.handleCancel,
        onFocus: this.handleFocus
      }
    }
  },
  created () {
    // Initialize previousValue to computed _value
    this.previousValue = this._value
  },
  mounted () {
    this.$watch('isEditing', (newVal) => {
      if (newVal) {
        this.$emit('edit')
      }
    })

    this.$watch(vm => [vm.isEditing, vm.selectAllOnFocus], () => {
      this.$nextTick(() => {
        this.inputNode = getElement(`#${this.editableId}`, this.$el)
        if (this.isEditing && this.inputNode) {
          this.inputNode.focus()
          this.selectAllOnFocus && this.inputNode.select()
        }
      })
    })
  },
  methods: {
    /**
     * Handle cancel event
     */
    handleCancel () {
      this.isEditing = false
      this.innerValue = this.previousValue
      if (this.innerValue !== this.previousValue) {
        this.$emit('change', this.previousValue)
      }
      this.$emit('cancel', this.previousValue)
    },
    /**
     * Handle submit event
     */
    handleSubmit () {
      this.isEditing = false
      this.previousValue = this.innerValue
      this.$emit('submit', this.innerValue)
    },
    /**
     * Handle change event
     */
    handleChange (event) {
      const { value } = event.target
      if (!this.isControlled) {
        this.innerValue = value
      }
      this.$emit('change', this.innerValue)
    },
    /**
     * Handle keydown event
     */
    handleKeyDown (event) {
      const { key } = event
      if (key === 'Escape') {
        this.handleCancel()
        return
      }

      if (key === 'Enter') {
        this.handleSubmit()
      }
    },
    /**
     * Handle focus event
     */
    handleFocus (event) {
      if (this.selectAllOnFocus) {
        this.inputNode.select()
      }
    },
    /**
     * Handle request editing
     */
    onRequestEdit () {
      if (!this.isDisabled) {
        this.isEditing = true
      }
    }
  },
  render (h) {
    return h(CBox, {
      props: forwardProps(this.$props)
    }, [
      this.$scopedSlots.default({
        isEditing: this.isEditing,
        onSubmit: this.handleSubmit,
        onCancel: this.handleCancel,
        onRequestEdit: this.onRequestEdit
      })
    ])
  }
}

const CEditablePreview = {
  name: 'CEditablePreview',
  inject: ['$EditableContext'],
  props: styleProps,
  computed: {
    context () {
      return this.$EditableContext()
    },
    hasValue () {
      return isDef(this.context.value) && this.context.value !== ''
    },
    styleProps () {
      return {
        ...sharedEditableProps,
        cursor: 'text',
        display: 'inline-block',
        opacity: !this.hasValue ? 0.6 : undefined
      }
    },
    tabIndex () {
      const { isEditing, isDisabled, isPreviewFocusable } = this.context
      if ((!isEditing || !isDisabled) && isPreviewFocusable) {
        return 0
      }
      return null
    }
  },
  render (h) {
    const { isEditing, isDisabled, onRequestEdit, value, placeholder } = this.context
    if (isEditing) {
      return null
    }

    return h(CPseudoBox, {
      props: {
        as: 'span',
        ...this.styleProps,
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-disabled': isDisabled,
        tabIndex: this.tabIndex
      },
      nativeOn: {
        focus: onRequestEdit
      }
    }, this.hasValue ? value : placeholder)
  }
}

const CEditableInput = {
  name: 'CEditableInput',
  inject: ['$EditableContext'],
  props: styleProps,
  computed: {
    context () {
      return this.$EditableContext()
    },
    styleProps () {
      return {
        ...sharedEditableProps,
        width: 'full',
        _placeholder: {
          opacity: '0.6'
        }
      }
    }
  },
  render (h) {
    const {
      isEditing,
      editableId,
      onChange,
      onKeyDown,
      value,
      onSubmit,
      submitOnBlur,
      placeholder,
      isDisabled
    } = this.context

    if (!isEditing) {
      return null
    }

    return h(CPseudoBox, {
      props: {
        as: 'input',
        outline: 'none',
        _focus: {
          shadow: 'outline'
        },
        ...this.styleProps,
        ...forwardProps(this.$props)
      },
      nativeOn: {
        blur: event => {
          submitOnBlur && onSubmit()
          this.$emit('blur', event)
        },
        input: onChange,
        keydown: onKeyDown
      },
      attrs: {
        id: editableId,
        disabled: isDisabled,
        'aria-disabled': isDisabled,
        value,
        placeholder
      }
    }, this.$slots.default)
  }
}

export default CEditable
export { CEditableInput, CEditablePreview }
