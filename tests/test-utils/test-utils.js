import '@testing-library/jest-dom/extend-expect'
import * as vtl from '@testing-library/vue'
import { toCSSVar } from '@chakra-ui/styled-system'
import userEvent from '@testing-library/user-event'
import theme from '@chakra-ui/theme-vue'

import icons from '@/packages/chakra-ui-core/src/lib/internal-icons'

const defaultProviders = options => ({
  $chakraTheme: () => toCSSVar(theme),
  $chakraColorMode: () => 'light',
  $chakraIcons: icons,
  ...options
})

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
  let styles = ''
  const sel = new RegExp(selector)
  
  document.styleSheets.forEach(sheet => {
    sheet.cssRules.forEach(rule => {
      if (sel.test(rule.selectorText)) {
        const cssText = rule.style.cssText
        styles += cssText.split(';').join(';\n')
      }
    })
  })
  return styles
}

/**
 * Gets the tagname of an element
 * @param {HTMLElement} node Element
 */
export const getTagName = (node) => {
  if (!(node instanceof HTMLElement)) {
    throw new Error('Expected HTMLElement as argument')
  }
  return node.tagName.toLowerCase()
}

/**
 * Gets all variables name from current document stylesheets
 * @returns {Array} string
 */
export const getAllCssVariableNames = () => {
  return Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .flatMap((rule) => rule.style && Array.from(rule.style))
    .filter((key) => key && key.startsWith('--'))
}

/**
 * Get a dict of variables for a given variables
 * @param {*} element element to check
 * @param {*} cssVarNames list of names, optional
 * @returns {Object}
 */
export const getElementCssVariables = (element, cssVarNames) => {
  const varNames = cssVarNames || getAllCssVariableNames()
  const styles = getComputedStyle(element)
  const styleDict = {}

  varNames.forEach(key => {
    styleDict[key] = styles.getPropertyValue(key)
  })

  return styleDict
}

export * from '@testing-library/vue'
export { render, userEvent, waitMs, defaultProviders }
