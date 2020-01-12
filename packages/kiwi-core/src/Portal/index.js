import { canUseDOM, useId, getSubstringAfterChar as gs } from '../utils'
import { MountingPortal } from 'portal-vue'

const PORTAL_ID = '#popper-vue-portal'

/**
 * @description Creates portal target node. If node doesn't exist, it is created and returned
 * @param {String} target
 * @returns {HTMLElement}
 */
function createPortalTarget (target) {
  if (!canUseDOM) {
    return
  }

  const portalTarget = target || PORTAL_ID
  const existingPortalElement = document.querySelector(portalTarget)

  if (existingPortalElement) {
    return existingPortalElement
  } else {
    const el = document.createElement('div')
    if (portalTarget.startsWith('#')) {
      el.id = gs(portalTarget, '#')
    }
    if (portalTarget.startsWith('.')) {
      el.classList.add(gs(portalTarget, '.'))
      el.id = useId(4)
    }
    if (document.body != null) {
      document.body.appendChild(el)
    }
    return el
  }
}

/**
 * Portal Component
 */
const Portal = {
  name: 'Portal',
  inheritAttrs: false,
  props: {
    target: String,
    append: Boolean
  },
  render (h) {
    const portalTarget = createPortalTarget(this.target)
    const children = this.$slots.default
    return h(MountingPortal, {
      props: {
        ...this.$attrs,
        append: this.append,
        mountTo: `#${portalTarget.id}`
      }
    }, children)
  }
}

export default Portal
