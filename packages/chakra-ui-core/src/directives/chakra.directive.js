import { css } from 'emotion'
import __css from '@styled-system/css'
import { systemProps } from '../CBox'
import styleProps from '../config/props'
import { forwardProps, camelize } from '../utils'
import { parsePseudoStyles } from '../CPseudoBox/utils'

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
function createClassName (styleObject, theme) {
  const pure = filterChakraProps(forwardProps(styleObject))
  const { pseudoStyles, baseProps } = parsePseudoStyles(pure)
  const baseStyles = systemProps({ ...baseProps, theme })
  const _pseudoStyles = __css(pseudoStyles)(theme)
  const className = css({ ...baseStyles, ..._pseudoStyles })
  return [className, pure]
}

/** Creates Chakra Directive */
export default function createCharkaDirective (theme) {
  return {
    bind (el, binding, vnode) {
      const [className, pure] = createClassName(vnode.data.attrs, theme)
      el.classList.add(className)
      purifyAttrs(el, pure)

      if (binding.value && typeof binding.value === 'object') {
        const [className, pure] = createClassName(binding.value, theme)
        el.classList.add(className)
        purifyAttrs(el, pure)
      }
    }
  }
}
