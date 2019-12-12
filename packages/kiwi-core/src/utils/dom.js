const focusableElList = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]'
]

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
