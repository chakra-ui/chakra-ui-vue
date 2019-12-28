
import { focusableElList, htmlElements } from './dom-elements'

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
