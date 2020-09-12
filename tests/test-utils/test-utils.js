import '@testing-library/jest-dom/extend-expect'
import * as vtl from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import defaultProviders from './providers-mock'

const render = (component, ...rest) => {
  const defaults = {
    provide: () => defaultProviders()
  }
  const utils = vtl.render({ ...defaults, ...component }, ...rest)
  return {
    ...utils,
    asFragment: (innerHTML = utils.container.innerHTML) => {
      if (typeof document.createRange === 'function') {
        return document
          .createRange()
          .createContextualFragment(innerHTML)
      }

      const template = document.createElement('template')
      template.innerHTML = innerHTML
      return template.content
    }
  }
}

/**
 * Wait for given ms
 *
 * @param {number} duration
 */
function waitMs (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Get styles from document.styleSheets
 *
 * @param {String} selector
 *
 * @example className usage
 *  getElementStyles('.anyClassName')
 *
 * @example Emotion Classname
 *  const [className1, className2] = [...screen.getByTestId('aspectRatioBox').classList]
 *  const styles = getElementStyles(`.${className1}`)
 *  const pseudoStyles = getElementStyles(`.${className2}:before`)
 */
export function getElementStyles (selector) {
  selector = new RegExp(selector)
  let styles = []
  let i; let j; const sel = selector
  for (i = 0; i < document.styleSheets.length; ++i) {
    for (j = 0; j < document.styleSheets[i].cssRules.length; ++j) {
      if (sel.test(document.styleSheets[i].cssRules[j].selectorText)) {
        // let selectorText = document.styleSheets[i].cssRules[j].selectorText
        const cssText = document.styleSheets[i].cssRules[j].style.cssText
        styles += cssText
      }
    }
  }
  return styles
}

/**
 * Gets the tagname of an element
 * @param {HTMLElement} node Element
 */
export const getTagName = (node) => {
  if (!(node instanceof HTMLElement)) throw new Error('Expected HTMLElement as argument')
  return node.tagName.toLowerCase()
}

export * from '@testing-library/vue'
export {
  render,
  userEvent,
  waitMs,
  defaultProviders
}
