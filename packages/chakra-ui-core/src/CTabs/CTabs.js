/**
 * Hey! Welcome to @chakra-ui/vue Tabs
 *
 * The CTab component consists of clickable tabs, that are aligned side by side.
 *
 * @see Docs     https://vue.chakra-ui.com/tabs
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTabs/CTabs.js
 */

import { useVariantColorWarning, isDef, useId, cleanChildren, cloneVNodeElement, createStyledAttrsMixin } from '../utils'
import { useTabListStyle, useTabStyle } from './utils/tabs.styles'

/**
 * CTabs component
 *
 * the switch component that serves as an alternative for checkbox.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTabs = {
  name: 'CTabs',
  mixins: [createStyledAttrsMixin('CTabs')],
  props: {
    index: Number,
    defaultIndex: Number,
    isManual: Boolean,
    variant: {
      type: String,
      default: 'line'
    },
    variantColor: {
      type: String,
      default: 'blue'
    },
    align: {
      type: String,
      default: 'start'
    },
    size: {
      type: String,
      default: 'md'
    },
    orientation: {
      type: String,
      default: 'horizontal'
    },
    isFitted: Boolean
  },
  provide () {
    return {
      $TabContext: () => this.TabContext
    }
  },
  data () {
    return {
      selectedPanelNode: undefined,
      selectedIndex: this.getInitialIndex(),
      manualIndex: this.index || this.defaultIndex || 0
    }
  },
  computed: {
    TabContext () {
      return {
        id: this.id,
        selectedIndex: this.selectedIndex,
        index: this.actualIdx,
        manualIndex: this.manualIdx,
        onManualTabChange: this.onManualTabChange,
        isManual: this.isManual,
        onChangeTab: this.onChangeTab,
        selectedPanelRef: this.selectedPanelRef,
        onFocusPanel: this.onFocusPanel,
        color: this.variantColor,
        size: this.size,
        align: this.align,
        variant: this.variant,
        isFitted: this.isFitted,
        orientation: this.orientation,
        set: this.set
      }
    },
    isControlled () {
      return isDef(this.index)
    },
    id () {
      return `tabs-${useId()}`
    },
    actualIdx () {
      if (!this.isManual) {
        return this.defaultIndex || 0
      } else {
        return this.index || this.defaultIndex || 0
      }
    },
    manualIdx () {
      return this.isControlled ? this.index : this.manualIndex
    }
  },
  created () {
    useVariantColorWarning(this.theme, 'CTabs', this.variantColor)
  },
  methods: {
    /**
     * Gets initial active tab index
     */
    getInitialIndex () {
      if (!this.isManual) {
        return this.defaultIndex || 0
      } else {
        return this.index || this.defaultIndex || 0
      }
    },

    /**
     * Handles tab chage
     * @param {Number} index Index to vbe set
     */
    onChangeTab (index) {
      if (!this.isControlled) {
        this.selectedIndex = index
      }

      if (this.isControlled && this.isManual) {
        this.selectedIndex = index
      }

      if (!this.isManual) {
        this.$emit('change', index)
      }
    },

    /**
     * Manual tab change handler
     * @param {Number} index Index of tab to set
     */
    onManualTabChange (index) {
      if (!this.isControlled) {
        this.manualIndex = index
      }

      if (this.isManual) {
        this.$emit('change', index)
      }
    },

    /**
     * Focuses on active tab
     */
    onFocusPanel () {
      if (this.selectedPanelNode) {
        this.selectedPanelNode.focus()
      }
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
    return h(this.as, {
      class: [this.className],
      attrs: this.computedAttrs,
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CTabList component
 *
 * the list wrapper component for each tab
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTabList = {
  name: 'CTabList',
  mixins: [createStyledAttrsMixin('CTabList')],
  inject: ['$TabContext'],
  data () {
    return {
      allNodes: {},
      validChildren: [],
      focusableIndexes: []
    }
  },
  computed: {
    context () {
      return this.$TabContext()
    },
    componentStyles () {
      const { align, variant, orientation } = this.context
      return {
        display: 'flex',
        ...useTabListStyle({
          theme: this.theme,
          align,
          orientation,
          variant
        })
      }
    },
    enabledSelectedIndex () {
      const { selectedIndex } = this.context
      return this.focusableIndexes.indexOf(selectedIndex)
    },
    count () {
      return this.focusableIndexes.length
    }
  },
  mounted () {
    this.$nextTick(() => {
      const children = this.$el.children
      this.allNodes = Object.assign({}, children)
    })
  },
  methods: {

    /**
     * Updates current Index
     * @param {Number} index Index
     */
    updateIndex (index) {
      const { onChangeTab } = this.context
      const childIndex = this.focusableIndexes[index]
      this.allNodes[childIndex].focus()
      onChangeTab && onChangeTab(childIndex)
    },

    /**
     * Handles keydown event
     * @param {Event} event event
     */
    handleKeyDown (event) {
      const { onFocusPanel } = this.context

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        const nextIndex = (this.enabledSelectedIndex + 1) % this.count
        this.updateIndex(nextIndex)
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        const nextIndex = (this.enabledSelectedIndex - 1 + this.count) % this.count
        this.updateIndex(nextIndex)
      }

      if (event.key === 'Home') {
        event.preventDefault()
        this.updateIndex(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        this.updateIndex(this.count - 1)
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        onFocusPanel && onFocusPanel()
      }

      this.$emit('keydown', event)
    }
  },
  render (h) {
    this.validChildren = cleanChildren(this.$slots.default)

    const { id, isManual, manualIndex, selectedIndex, onManualTabChange, onChangeTab, orientation } = this.context
    const validChildren = cleanChildren(this.$slots.default)
    const clones = validChildren.map((vnode, index) => {
      const isSelected = isManual ? index === manualIndex : index === selectedIndex

      const handleClick = (event) => {
        // Hack for Safari. Buttons don't receive focus on click on Safari
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
        this.allNodes[index].focus()

        onManualTabChange(index)
        onChangeTab(index)

        this.$emit('click', event)
      }

      const clone = cloneVNodeElement(vnode, {
        props: {
          isSelected
        },
        nativeOn: {
          click: handleClick
        },
        attrs: {
          id: `${id}-${index}`
        }
      }, h)

      return clone
    })

    this.focusableIndexes = clones
      .map((child, index) => (child.componentOptions.propsData.isDisabled === true ? null : index))
      .filter(index => index != null)

    return h(this.as, {
      class: [this.className],
      attrs: {
        role: 'tablist',
        'aria-orientation': orientation,
        ...this.computedAttrs
      },
      on: {
        ...this.computedListeners,
        keydown: this.handleKeyDown
      }
    }, clones)
  }
}

/**
 * CTab component
 *
 * the tab element component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTab = {
  name: 'CTab',
  mixins: [createStyledAttrsMixin('CTab', true)],
  inject: ['$TabContext'],
  props: {
    isSelected: Boolean,
    isDisabled: Boolean,
    id: String,
    as: {
      type: [String, Object],
      default: 'button'
    }
  },
  computed: {
    context () {
      return this.$TabContext()
    },
    componentStyles () {
      const { color, isFitted, orientation, size, variant } = this.context
      return {
        outline: 'none',
        ...useTabStyle({
          colorMode: this.colorMode,
          theme: this.theme,
          color,
          isFitted,
          orientation,
          size,
          variant
        })
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: [this.className],
      attrs: {
        role: 'tab',
        tabIndex: this.isSelected ? 0 : -1,
        id: `tab:${this.id}`,
        type: 'button',
        disabled: this.isDisabled,
        'aria-disabled': this.isDisabled,
        'aria-selected': this.isSelected,
        'aria-controls': `panel:${this.id}`,
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CTabPanel component
 *
 * the panel element component fro tab content
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTabPanel = {
  name: 'CTabPanel',
  mixins: [createStyledAttrsMixin('CTabPanel')],
  props: {
    isSelected: Boolean,
    selectedPanelNode: Object,
    id: String
  },
  render (h) {
    return h(this.as, {
      class: [this.className],
      attrs: {
        role: 'tabpanel',
        tabIndex: -1,
        'aria-labelledby': `tab:${this.id}`,
        hidden: !this.isSelected,
        id: `panel:${this.id}`,
        outline: 0,
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CTabPanels component
 *
 * the wrapper  component fro tab panels
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/tabs
 */
const CTabPanels = {
  name: 'CTabPanels',
  mixins: [createStyledAttrsMixin('CTabPanels')],
  inject: ['$TabContext'],
  computed: {
    context () {
      return this.$TabContext()
    }
  },
  render (h) {
    const {
      selectedIndex,
      id,
      isManual,
      manualIndex
    } = this.context

    const validChildren = cleanChildren(this.$slots.default)

    const clones = validChildren.map((child, index) => {
      const isSelected = isManual ? index === manualIndex : index === selectedIndex
      return cloneVNodeElement(child, {
        props: {
          isSelected,
          id: `${id}-${index}`
        }
      }, h)
    })

    return h(this.as, {
      class: [this.className],
      attrs: {
        tabIndex: -1,
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, clones)
  }
}

export {
  CTabs,
  CTabList,
  CTab,
  CTabPanels,
  CTabPanel
}
