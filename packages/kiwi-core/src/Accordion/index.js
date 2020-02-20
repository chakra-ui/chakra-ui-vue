import { baseProps } from '../config'
import Box from '../Box'
import { forwardProps, cloneVNodes, useId, isDef } from '../utils'
import PseudoBox from '../PseudoBox'
import styleProps from '../config/props'
import Collapse from '../Collapse'
import Icon from '../Icon'
import { iconProps } from '../Icon/icon.props'

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
      type: [Array, Number],
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
    const children = this.$slots.default.filter(e => e.tag)
    const cloned = cloneVNodes(children, h)
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
    ...styleProps,
    isOpen: {
      type: Boolean,
      default: null
    },
    defaultIsOpen: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: useId()
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
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
      return isDef(this.isOpen)
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
      this.$emit('change', !this._isExpanded)
      if (!this.isControlled) {
        this._isExpanded = !this._isExpanded
      }
    }
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        ...forwardProps(this.$props),
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

const AccordionHeader = {
  name: 'AccordionHeader',
  inject: ['$AccordionContext'],
  props: styleProps,
  computed: {
    context () {
      return this.$AccordionContext()
    }
  },
  render (h) {
    const { isExpanded, panelId, headerId, isDisabled, onToggle } = this.context
    return h(PseudoBox, {
      props: {
        ...forwardProps(this.$props),
        as: 'button',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 0,
        transition: 'all 0.2s',
        px: 4,
        py: 2,
        _focus: { boxShadow: 'outline' },
        _hover: { bg: 'blackAlpha.50' },
        _disabled: { opacity: '0.4', cursor: 'not-allowed' }
      },
      attrs: {
        id: headerId,
        type: 'button',
        disabled: isDisabled,
        'aria-disabled': isDisabled,
        'aria-expanded': isExpanded,
        'aria-controls': panelId
      },
      nativeOn: {
        click: (e) => {
          onToggle()
          this.$emit('click', e)
        }
      }
    }, this.$slots.default)
  }
}

const AccordionPanel = {
  name: 'AccordionPanel',
  inject: ['$AccordionContext'],
  props: baseProps,
  computed: {
    context () {
      return this.$AccordionContext()
    }
  },
  render (h) {
    const { isExpanded, panelId, headerId } = this.context

    return h(Collapse, {
      props: {
        ...forwardProps(this.$props),
        isOpen: isExpanded,
        pt: 2,
        px: 4,
        pb: 5
      },
      attrs: {
        id: panelId,
        'data-accordion-panel': '',
        'aria-labelledby': headerId,
        'aria-hidden': !isExpanded,
        role: 'region'
      }
    }, this.$slots.default)
  }
}

const AccordionIcon = {
  name: 'AccordionIcon',
  inject: ['$AccordionContext'],
  props: {
    ...baseProps,
    ...iconProps
  },
  computed: {
    context () {
      return this.$AccordionContext()
    }
  },
  render (h) {
    const { isExpanded, isDisabled } = this.context
    return h(Icon, {
      props: {
        ...forwardProps(this.$props),
        size: this.size || '1.25em',
        name: this.name || 'chevron-down',
        opacity: isDisabled ? 0.4 : 1,
        transform: isExpanded ? 'rotate(-180deg)' : null,
        transition: 'transform 0.2s',
        transformOrigin: 'center'
      }
    })
  }
}

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon
}
