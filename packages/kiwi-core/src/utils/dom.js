
import { focusableElList, htmlElements } from './dom-elements'

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const HTMLElement = !!(
  canUseDOM
    ? window.HTMLElement
    : Object
)

/**
 * Checks if a given element is an HTML element.
 * @param {String} element HTML element tag name
 * @returns {Boolean}
 */
export function isValidElement (element) {
  if (typeof element === 'string') {
    return htmlElements.indexOf(element) !== -1
  }
}

const focusableElSelector = focusableElList.join()

/**
 * Get a NodeList of all focusable DOM nodes within an element
 * @param {HTMLElement} element HTML element to get focusable list of DOM nodes from.
 * @param {Boolean} keyboardOnly Should get only keyboard accessible nodes?
 * @returns {NodeList} List of all focusable DOM nodes
 */
export function getFocusables (element, keyboardOnly = false) {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector))

  // filter out elements with display: none
  focusableEls = focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== 'none'
  )

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(
      focusableEl => focusableEl.getAttribute('tabindex') !== '-1'
    )
  }
  return focusableEls
}

/**
 * @description Wraps and executes both user and internal event handlers for a single event
 * @param {Function} theirHandler Userland event handler
 * @param {*} ourHandler Internal Vue chakra event handler
 */
export const wrapEvent = (theirHandler, ourHandler) => event => {
  if (theirHandler) {
    theirHandler(event)
  }

  if (!event.defaultPrevented) {
    return ourHandler(event)
  }
}

/**
 * Queries an element from the DOM
 * @param {String} selector Element selector
 * @param {Node} domain HTML element in which to query for element
 * @returns {Node} Node
 */
export const getElement = (selector, domain) => {
  if (!domain) {
    return document.querySelector(selector)
  } else {
    return domain.querySelector(selector)
  }
}

/**
 * Queries an element by ID from the DOM
 * @param {String} id Element id
 * @param {Node} domain HTML element in which to query for element
 * @returns {Node} Node
 */
export const getElById = (id, domain) => {
  return getElement(`#${id}`, domain)
}
