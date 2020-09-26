import { css } from 'emotion'
import __css from '@styled-system/css'
import { parsePseudoStyles } from '../CPseudoBox/utils'
import { composeSystem } from './styled-system'
import { hasOwn, extractChakraAttrs } from './object'

export const isVueComponent = (value) => {
  return (!!value && !!value.$el)
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
export const createStyledAttrsMixin = (name, isPseudo) => ({
  name,
  inheritAttrs: false,
  inject: ['$chakraTheme', '$chakraColorMode', '$chakraSystem'],
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
      const styles = Object.assign({}, this.componentStyles || {}, $attrs)

      const { styleAttrs, nativeAttrs } = extractChakraAttrs(styles)
      return {
        styleAttrs,
        nativeAttrs
      }
    },
    className () {
      const { styleAttrs } = this.splitProps
      if (isPseudo) {
        const { pseudoStyles, baseStyles } = parsePseudoStyles(styleAttrs)
        const _baseStyles = composeSystem(baseStyles, this.theme)
        const _pseudoStyles = __css(pseudoStyles)(this.theme)
        return css({
          ..._baseStyles,
          ..._pseudoStyles
        })
      }
      const boxStylesObject = composeSystem(styleAttrs, this.theme)
      return css(boxStylesObject)
    },
    /** Computed attributes object */
    computedAttrs () {
      return {
        ...name && { 'data-chakra-component': name },
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
