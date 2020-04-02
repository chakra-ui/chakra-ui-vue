/**
 * Hey! Welcome to @chakra-ui/vue Accordion
 *
 * Accordions display a list of high-level
 * options that can expand/collapse to reveal
 * more information.
 *
 * An accordion is a vertically stacked set
 * of interactive headings that each contain
 * a title, content snippet, or thumbnail
 * representing a section of content.
 * The headings function as controls that enable
 * users to reveal or hide their associated sections
 * of content. Accordions are commonly used to
 * reduce the need to scroll when presenting
 * multiple sections of content on a single page.
 *
 * @see Docs     https://vue.chakra-ui.com/accordion
 * @see Source   link to source
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAccordion/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
 */

import { baseProps } from '../config'
import { forwardProps, cloneVNodes, useId, isDef } from '../utils'
import styleProps from '../config/props'
import { iconProps } from '../CIcon/utils/icon.props'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
import CCollapse from '../CCollapse'
import CIcon from '../CIcon'

/**
 * CAccordion component
 *
 * The wrapper that clones it's children
 * to pass it's prop to the `CAccordionItem`.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/accordion
 */

const CAccordion = {
  name: 'CAccordion',
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

    return h(CBox, {
      props: {
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CAccordion'
      }
    }, clones)
  }
}

/**
 * CAccordionItem component
 *
 * A single accordion item
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/accordion
 */

const CAccordionItem = {
  name: 'CAccordionItem',
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
    return h(CPseudoBox, {
      props: {
        ...forwardProps(this.$props),
        borderTopWidth: '1px',
        _last: { borderBottomWidth: '1px' }
      },
      attrs: {
        'data-chakra-component': 'CAccordionItem'
      }
    }, [
      this.$scopedSlots.default({
        isExpanded: this._isExpanded,
        isDisabled: this.isDisabled
      })
    ])
  }
}

/**
 * CAccordionHeader component
 *
 * The button that toggles the expand/collapse
 * state of the accordion item.
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/accordion
 */
const CAccordionHeader = {
  name: 'CAccordionHeader',
  inject: ['$AccordionContext'],
  props: styleProps,
  computed: {
    context () {
      return this.$AccordionContext()
    }
  },
  render (h) {
    const { isExpanded, panelId, headerId, isDisabled, onToggle } = this.context
    return h(CPseudoBox, {
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
        'aria-controls': panelId,
        'data-chakra-component': 'CAccordionHeader'
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

/**
 * CAccordionPanel component
 *
 * The container for the accordion item
 * details to be revealed.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/accordion
 */
const CAccordionPanel = {
  name: 'CAccordionPanel',
  inject: ['$AccordionContext'],
  props: baseProps,
  computed: {
    context () {
      return this.$AccordionContext()
    }
  },
  render (h) {
    const { isExpanded, panelId, headerId } = this.context

    return h(CCollapse, {
      props: {
        ...forwardProps(this.$props),
        isOpen: isExpanded,
        pt: 2,
        px: 4,
        pb: 5
      },
      attrs: {
        id: panelId,
        'data-chakra-component': 'CAccordionPanel',
        'aria-labelledby': headerId,
        'aria-hidden': !isExpanded,
        role: 'region'
      }
    }, this.$slots.default)
  }
}

/**
 * CAccordionIcon component
 *
 * A chevron-down icon that rotates based on the
 * expanded/collapsed state.
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/accordion
 */
const CAccordionIcon = {
  name: 'CAccordionIcon',
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
    return h(CIcon, {
      props: {
        ...forwardProps(this.$props),
        size: this.size || '1.25em',
        name: this.name || 'chevron-down',
        opacity: isDisabled ? 0.4 : 1,
        transform: isExpanded ? 'rotate(-180deg)' : null,
        transition: 'transform 0.2s',
        transformOrigin: 'center'
      },
      attrs: {
        'data-chakra-component': 'CAccordionIcon'
      }
    })
  }
}

export {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionPanel,
  CAccordionIcon
}
