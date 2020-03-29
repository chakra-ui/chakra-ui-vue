import { baseProps } from '../config'
import { useVariantColorWarning, isDef, useId, forwardProps, cleanChildren, cloneVNodeElement } from '../utils'
import { useTabListStyle, useTabStyle } from './utils/tabs.styles'
import styleProps from '../config/props'

import CFlex from '../CFlex'
import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'

const CTabs = {
  name: 'CTabs',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    ...baseProps,
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
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
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
    return h(CBox, {
      props: forwardProps(this.$props)
    }, this.$slots.default)
  }
}

const CTabList = {
  name: 'CTabList',
  props: baseProps,
  inject: ['$TabContext', '$chakraTheme', '$chakraColorMode'],
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
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    tabListStyleProps () {
      const { align, variant, orientation } = this.context
      return useTabListStyle({
        theme: this.theme,
        align,
        orientation,
        variant
      })
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
      let isSelected = isManual ? index === manualIndex : index === selectedIndex

      const handleClick = event => {
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

    return h(CFlex, {
      attrs: {
        role: 'tablist',
        'aria-orientation': orientation
      },
      props: {
        ...this.tabListStyleProps,
        ...forwardProps()
      },
      nativeOn: {
        keydown: this.handleKeyDown
      }
    }, clones)
  }
}

const CTab = {
  name: 'CTab',
  inject: ['$chakraTheme', '$chakraColorMode', '$TabContext'],
  props: {
    ...styleProps,
    isSelected: Boolean,
    isDisabled: Boolean,
    id: String
  },
  computed: {
    context () {
      return this.$TabContext()
    },
    tabStyleProps () {
      const { color, isFitted, orientation, size, variant } = this.context
      const styles = useTabStyle({
        colorMode: this.colorMode,
        theme: this.theme,
        color,
        isFitted,
        orientation,
        size,
        variant
      })
      return styles
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    return h(CPseudoBox, {
      props: {
        outline: 'none',
        as: 'button',
        ...this.tabStyleProps,
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'tab',
        tabIndex: this.isSelected ? 0 : -1,
        id: `tab:${this.id}`,
        type: 'button',
        disabled: this.isDisabled,
        'aria-disabled': this.isDisabled,
        'aria-selected': this.isSelected,
        'aria-controls': `panel:${this.id}`
      }
    }, this.$slots.default)
  }
}

const CTabPanel = {
  name: 'CTabPanel',
  props: {
    ...baseProps,
    isSelected: Boolean,
    selectedPanelNode: Object,
    id: String
  },
  render (h) {
    return h(CBox, {
      attrs: {
        role: 'tabpanel',
        tabIndex: -1,
        'aria-labelledby': `tab:${this.id}`,
        hidden: !this.isSelected,
        id: `panel:${this.id}`,
        outline: 0,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const CTabPanels = {
  name: 'CTabPanels',
  inject: ['$TabContext'],
  props: baseProps,
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
      return cloneVNodeElement(child, {
        props: {
          isSelected: isManual ? index === manualIndex : index === selectedIndex,
          id: `${id}-${index}`
        }
      }, h)
    })

    return h(CBox, {
      props: forwardProps(this.$props),
      attrs: {
        tabIndex: -1
      }
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
