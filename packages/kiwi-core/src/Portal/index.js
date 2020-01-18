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
  props: {
    target: String,
    append: Boolean,
    unmountOnDestroy: Boolean,
    disabled: Boolean,
    name: String,
    order: Number,
    slim: Boolean,
    bail: Boolean
  },
  data () {
    return {
      portalTarget: undefined,
      targetId: undefined
    }
  },
  created () {
    if (!this.disabled) {
      this.portalTarget = createPortalTarget(this.target)
      this.targetId = this.portalTarget.id
      if (this.portalTarget && this.portalTarget.isConnected) {
        this.$nextTick(() => {
          this.$emit('portal:targetConnected')
        })
      }
      this.unmountOnDestroy && this.$once('hook:destroyed', () => {
        canUseDOM && document.body.removeChild(this.portalTarget)
      })
    }
  },
  methods: {
    /**
     * Unmounts portal target
     */
    unmountTarget () {
      canUseDOM && document.body.removeChild(this.portalTarget)
    }
  },
  render (h) {
    const children = this.$slots.default
    return !this.disabled ? h(MountingPortal, {
      props: {
        append: this.append,
        mountTo: `#${this.targetId}`,
        disabled: this.disabled,
        name: this.name,
        order: this.order,
        slim: this.slim,
        bail: this.bail
      }
    }, children) : children[0]
  }
}

export default Portal
