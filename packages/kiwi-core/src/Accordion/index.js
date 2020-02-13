import { baseProps } from '../config'
import Box from '../Box'
import { forwardProps, cloneVNodes, useId } from '../utils'
import PseudoBox from '../PseudoBox'

const Accordion = {
  name: 'Accordion',
  props: {
    ...baseProps,
    allowMultiple: Boolean,
    allowToggle: Boolean,
    index: {
      type: Number,
      default: null
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    const initializeState = () => {
      if (this.allowMultiple) {
        return this.defaultIndex || []
      } else {
        return this.defaultIndex || 0
      }
    }
    return {
      expandedIndex: initializeState()
    }
  },
  computed: {
    isControlled () {
      return this.index != null
    },
    _index: {
      get () {
        return this.isControlled ? this.index : this.expandedIndex
      },
      set (val) {
        this.expandedIndex = val
      }
    }
  },
  methods: {
    getExpandCondition (index, itemIndex) {
      if (Array.isArray(index)) {
        return index.includes(itemIndex)
      }
      return index === itemIndex
    }
  },
  render (h) {
    const cloned = cloneVNodes(this.$slots.default, h)
    const clones = cloned.map((vnode, index) => {
      const clone = h(vnode.componentOptions.Ctor, {
        ...vnode.data,
        ...(vnode.componentOptions.listeners || {}),
        props: {
          ...(vnode.data.props || {}),
          ...vnode.componentOptions.propsData,
          isOpen: this.getExpandCondition(this._index, index)
        },
        on: {
          change: (isExpanded) => {
            if (this.allowMultiple) {
              if (isExpanded) {
                let newIndices = [...this._index, index]
                if (!this.isControlled) {
                  this.expandedIndex = newIndices
                };
                this.$emit('change', newIndices)
              } else {
                let newIndices = this._index.filter(
                  itemIndex => itemIndex !== index
                )
                if (!this.isControlled) {
                  this.expandedIndex = newIndices
                };
                this.$emit('change', newIndices)
              }
            } else {
              if (isExpanded) {
                if (!this.isControlled) {
                  this.expandedIndex = index
                };
                this.$emit('change', index)
              } else {
                if (this.allowToggle) {
                  if (!this.isControlled) {
                    this.expandedIndex = null
                  };
                  this.$emit('change', null)
                }
              }
            }
          }
        }
      }, vnode.componentOptions.children)
      return clone
    })

    return h(Box, {
      props: forwardProps(this.$props),
      attrs: {
        'data-accordion': ''
      }
    }, clones)
  }
}

const AccordionItem = {
  name: 'AccordionItem',
  props: {
    isOpen: Boolean,
    defaultIsOpen: Boolean,
    id: {
      type: String,
      default: useId()
    },
    isDisabled: Boolean
  },
  provide () {
    return {
      $AccordionContext: () => this.AccordionContext
    }
  },
  data () {
    return {
      isExpanded: this.defaultIsOpen || false
    }
  },
  computed: {
    AccordionContext () {
      return {
        isExpanded: this._isExpanded,
        isDisabled: this.isDisabled,
        headerId: this.headerId,
        panelId: this.panelId,
        onToggle: this.onToggle
      }
    },
    isControlled () {
      return this.isOpen !== false
    },
    _isExpanded: {
      get () {
        return this.isControlled ? this.isOpen : this.isExpanded
      },
      set (value) {
        this.isExpanded = value
      }
    },
    headerId () {
      return `accordion-header-${this.id}`
    },
    panelId () {
      return `accordion-panel-${this.id}`
    }
  },
  methods: {
    onToggle () {
      this.$emit('change', this._isExpanded)
      if (!this.isControlled) {
        this._isExpanded = !this._isExpanded
      }
    }
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        borderTopWidth: '1px',
        _last: { borderBottomWidth: '1px' }
      },
      attrs: {
        'data-accordion-item': ''
      }
    }, [
      this.$scopedSlots.default({
        isExpanded: this._isExpanded,
        isDisabled: this.isDisabled
      })
    ])
  }
}

export {
  Accordion,
  AccordionItem
}
