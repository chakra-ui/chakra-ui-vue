import { getSubstringAfterChar, createUuid } from '../utils'
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
const PORTAL_ID = '#kiwi-portal-target'

/**
 * @description Creates portal target node. If node doesn't exist, it is created and returned
 * @param {String} target
 * @returns {HTMLElement}
 */
export function createPortalTarget (target) {
  if (!isBrowser) {
    return
  }

  const portalTarget = target || PORTAL_ID
  const existingPortalElement = document.querySelector(portalTarget)

  if (existingPortalElement) {
    return existingPortalElement
  } else {
    const el = document.createElement('div')
    if (portalTarget.startsWith('#')) {
      el.id = getSubstringAfterChar(portalTarget, '#')
    }
    if (portalTarget.startsWith('.')) {
      el.classList.add(getSubstringAfterChar(portalTarget, '.'))
      el.id = createUuid(8)
    }
    if (document.body != null) {
      document.body.appendChild(el)
    }
    return el
  }
}
