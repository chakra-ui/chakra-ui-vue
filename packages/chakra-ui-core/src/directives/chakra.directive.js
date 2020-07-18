import { css } from 'emotion'
import Css from '../Css'
import styleProps from '../config/props'
import { camelize, kebabify } from '../utils'

/** Filter attrs and return object of chakra props */
function filterChakraProps (attrs) {
  const pure = {}
  for (const prop in attrs) {
    if (styleProps[camelize(prop)]) {
      pure[camelize(prop)] = attrs[prop]
    }
  }
  return pure
}

/** Purify Chakra attributes */
function purifyAttrs (el, props) {
  for (const attr in props) {
    el.removeAttribute(attr)
  }
}

/** Purify's Chakra Attributes from VNode object */
function purifyVNodeAttrs (vnode, props) {
  if (props && vnode.data.attrs) {
    for (const attr in props) {
      delete vnode.data.attrs[kebabify(attr)]
    }
  }
}

/** Creates className from styles object */
function createClassName (styleObject, theme, hasBindingValue = false) {
  const pure = filterChakraProps(styleObject)
  if (hasBindingValue) {
    const className = css(Css(styleObject)(theme))
    return [className, pure]
  }
  const className = css(Css(pure)(theme))
  return [className, pure]
}

/** Creates SSR `v-chakra` directive for Nuxt */
export function createServerDirective (theme) {
  return (vnode, directive) => {
    const [className, pure] = createClassName(vnode.data.attrs, theme)
    if (vnode.data.class) {
      vnode.data.class += ` ${className}`
    } else {
      vnode.data.class = className
    }
    purifyVNodeAttrs(vnode, pure)

    if (directive.value) {
      if (typeof directive.value === 'object') {
        const [className, pure] = createClassName(directive.value, theme, true)
        if (vnode.data.class) {
          vnode.data.class += ` ${className}`
        } else {
          vnode.data.class = className
        }
        purifyVNodeAttrs(vnode, pure)
      }

      if (typeof directive.value === 'function') {
        const styles = directive.value(theme)
        const [className, pure] = createClassName(styles, theme, true)
        if (vnode.data.class) {
          vnode.data.class += ` ${className}`
        } else {
          vnode.data.class = className
        }
        purifyVNodeAttrs(vnode, pure)
      }
    }
  }
};

/** Creates Client `v-chakra` Directive */
export function createClientDirective (theme) {
  return {
    bind (el, binding, vnode) {
      const [className, pure] = createClassName(vnode.data.attrs, theme)
      el.classList.add(className)
      purifyAttrs(el, pure)

      if (binding.value) {
        if (typeof binding.value === 'object') {
          const [className, pure] = createClassName(binding.value, theme, true)
          el.classList.add(className)
          purifyAttrs(el, pure)
        }

        if (typeof binding.value === 'function') {
          const styles = binding.value(theme)
          const [className, pure] = createClassName(styles, theme, true)
          el.classList.add(className)
          purifyAttrs(el, pure)
        }
      }
    }
  }
}
