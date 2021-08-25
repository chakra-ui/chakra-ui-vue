import { css } from '@emotion/css'
import { runIfFn } from '@chakra-ui/utils'
import { css as _css } from '@chakra-ui/styled-system'
import { __get } from './styled-system'
import { hasOwn, extractChakraAttrs } from './object'

export const isVueComponent = (value) => {
  return !!value && !!value.$el
}

/**
 * Makes a cache watcher handler for data property.
 * This utility helps prevent unnecessary re-renders
 * for primitives with changes in the $parent $attrs
 * and $listeners objects
 * @param {String} property
 */
export function createWatcher (property) {
  return {
    handler (newVal, oldVal) {
      for (const key in oldVal) {
        if (!hasOwn(newVal, key)) {
          this.$delete(this.$data[property], key)
        }
      }
      for (const key in newVal) {
        this.$set(this.$data[property], key, newVal[key])
      }
    },
    immediate: true
  }
}

/**
 * Create mixin for style attributes
 * @param {String} name Component name
 */
export const createStyledAttrsMixin = name => ({
  name,
  inheritAttrs: false,
  inject: ['$chakraTheme', '$chakraColorMode'],
  data () {
    return {
      attrs$: {},
      listeners$: {}
    }
  },
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    to: String
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    /** Split style attributes and native attributes */
    splitProps () {
      const $attrs = this.$data.attrs$
      const { styleAttrs, nativeAttrs } = extractChakraAttrs($attrs)

      return {
        styleAttrs,
        nativeAttrs
      }
    },
    baseStyle () {
      const componentBaseStyleObjectOrFunction = __get(this.theme, `baseStyles.${name}`)
      return componentBaseStyleObjectOrFunction ? (
        runIfFn(componentBaseStyleObjectOrFunction, {
          ...this.splitProps.styleAttrs,
          ...this.splitProps.nativeAttrs,
          theme: this.theme,
          colorMode: this.colorMode
        })
      ) : {}
    },
    className () {
      const { styleAttrs } = this.splitProps
      const merged = {
        ...this.componentStyles || {},
        ...this.baseStyle,
        ...styleAttrs
      }
      const boxStylesObject = _css(merged)(this.theme)

      return css(boxStylesObject)
    },
    /** Computed attributes object */
    computedAttrs () {
      return {
        ...(name && { 'data-chakra-component': name }),
        ...this.splitProps.nativeAttrs
      }
    },
    /** Computed listeners object */
    computedListeners () {
      return this.$data.listeners$
    }
  },
  created () {
    this.$watch('$attrs', createWatcher('attrs$'))
    this.$watch('$listeners', createWatcher('listeners$'))
  }
})
