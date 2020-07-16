import { css } from 'emotion'
import Css from '../Css'
import { kebabify, extractChakraAttrs } from '../utils'

/** Purify Chakra attributes */
const purifyAttrs = (el, props) => {
  for (const attr in props) {
    el.removeAttribute(attr)
    el.removeAttribute(kebabify(attr))
  }
}

/** Purify's Chakra Attributes from VNode object */
const purifyVNodeAttrs = (vnode, props) => {
  if (props && vnode.data.attrs) {
    for (const attr in props) {
      delete vnode.data.attrs[kebabify(attr)]
    }
  }
}

/** Creates SSR `v-chakra` directive for Nuxt */
export function createServerDirective (theme) {
  /** Applies server-side className */
  const applyServerClassName = (vnode, className, styleAttrs) => {
    if (vnode.data.class) {
      vnode.data.class += ` ${className}`
    } else {
      vnode.data.class = className
    }

    /**
     * Only remove style attributes
     * from VNode if directive has no
     * arguments
     **/
    if (styleAttrs) {
      purifyVNodeAttrs(vnode, styleAttrs)
    }
  }

  return (vnode, directive) => {
    const { styleAttrs } = extractChakraAttrs(vnode.data.attrs)
    const className = css(Css(styleAttrs)(theme))
    applyServerClassName(vnode, className, styleAttrs)

    if (directive.value) {
      if (typeof directive.value === 'object') {
        const className = css(Css(directive.value)(theme))
        applyServerClassName(vnode, className)
      }

      if (typeof directive.value === 'function') {
        const styles = directive.value(theme)
        const className = css(Css(styles)(theme))
        applyServerClassName(vnode, className)
      }
    }
  }
};

/** Creates Client `v-chakra` Directive */
export function createClientDirective (theme) {
  function applyClientStyles (el, binding, vnode) {
    const { styleAttrs } = extractChakraAttrs(vnode.data.attrs)
    // console.log({ styleAttrs, nativeAttrs })
    const className = css(Css(styleAttrs)(theme))
    el.classList.add(className)
    purifyAttrs(el, styleAttrs)

    if (binding.value) {
      if (typeof binding.value === 'object') {
        const className = css(Css(binding.value)(theme))
        el.classList.add(className)
      }

      if (typeof binding.value === 'function') {
        const styles = binding.value(theme)
        const className = css(Css(styles)(theme))
        el.classList.add(className)
      }
    }
  }

  return {
    bind: applyClientStyles,
    update: applyClientStyles,
    componentUpdated: applyClientStyles,
    unbind: applyClientStyles
  }
}
