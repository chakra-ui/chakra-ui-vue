import { css } from 'emotion'
import Css from '../Css'
import styleProps from '../config/props'
import { camelize } from '../utils'

/** Filter attrs and return object of chakra props */
function filterChakraProps (attrs) {
  const pure = {}
  for (const prop in attrs) {
    if (styleProps[camelize(prop)]) {
      pure[prop] = attrs[prop]
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

/** Creates Chakra Directive */
export default function createCharkaDirective (theme) {
  return {
    bind (el, binding, vnode) {
      console.log(vnode)
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
