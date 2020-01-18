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
    append: Boolean,
    unmountOnDestroy: Boolean
  },
  data () {
    return {
      portalTarget: undefined
    }
  },
  created () {
    this.portalTarget = createPortalTarget(this.target)
    this.unmountOnDestroy && this.$once('hook:destroyed', () => {
      canUseDOM && document.body.removeChild(this.portalTarget)
    })
  },
  methods: {
    unmountTarget () {
      this.$once('hook:destroyed', () => {
        canUseDOM && document.body.removeChild(this.portalTarget)
      })
    }
  },
  render (h) {
    const children = this.$slots.default
    return h(MountingPortal, {
      props: {
        ...this.$attrs,
        append: this.append,
        mountTo: `#${this.portalTarget.id}`
      }
    }, children)
  }
}

export default Portal
