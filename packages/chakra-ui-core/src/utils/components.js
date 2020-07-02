import { css } from 'emotion'
import __css from '@styled-system/css'
import { hasOwn } from '../utils'
import { parsePseudoStyles } from '../CPseudoBox/utils'
import { systemProps } from './styled-system'
import { purifyStyleAttributes, filterChakraStyleProps } from './object'

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
  inject: ['$chakraTheme', '$chakraColorMode'],
  data () {
    return {
      attrs$: {},
      listeners$: {}
    }
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
      const styles = {
        ...this.componentStyles && this.componentStyles,
        ...this.$data.attrs$
      }
      const styleProps = filterChakraStyleProps(styles)
      const attrs = purifyStyleAttributes(styles, styleProps)
      return {
        styleProps,
        attrs
      }
    },
    className () {
      const { styleProps } = this.splitProps
      if (isPseudo) {
        const { pseudoStyles, baseStyles } = parsePseudoStyles(styleProps)
        const _baseStyles = systemProps({ ...baseStyles, theme: this.theme })
        const _pseudoStyles = __css(pseudoStyles)(this.theme)
        return css({
          ..._baseStyles,
          ..._pseudoStyles
        })
      }
      const boxStylesObject = systemProps({ ...styleProps, theme: this.theme })
      return css(boxStylesObject)
    },
    /** Computed attributes object */
    computedAttrs () {
      return {
        ...this.splitProps.attrs,
        ...name && { 'data-chakra-component': name }
      }
    }
  },
  watch: {
    $attrs: createWatcher('attrs$'),
    $listeners: createWatcher('listeners$')
  }
})
