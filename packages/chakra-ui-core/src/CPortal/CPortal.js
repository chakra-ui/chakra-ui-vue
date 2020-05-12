/**
 * Hey! Welcome to @chakra-ui/vue Portal
 *
 * The Portal component is an internal utility component used
 * to create portals in the browser
 */

import { canUseDOM, useId, getSubstringAfterChar as gs } from '../utils'
import { MountingPortal } from 'portal-vue'
import CNoSsr from '../CNoSsr'

/**
 * CPortal component
 *
 * The portal component
 *
 * @extends MountingPortal
 * @see PortalVue https://portal-vue.linusb.org/api/mounting-portal.html
 */
const CPortal = {
  name: 'CPortal',
  props: {
    target: String,
    append: Boolean,
    unmountOnDestroy: Boolean,
    disabled: Boolean,
    name: String,
    order: Number,
    slim: Boolean,
    bail: Boolean,
    targetSlim: Boolean,
    as: {
      type: String,
      default: 'span'
    }
  },
  data () {
    return {
      portalTarget: undefined,
      targetId: undefined
    }
  },
  created () {
    if (!this.disabled) {
      this.mountTarget()
      this.unmountOnDestroy && this.$once('hook:destroyed', () => {
        canUseDOM && document.body.removeChild(this.portalTarget)
      })
    }
  },
  methods: {
  /**
   * @description Creates portal target node. If node doesn't exist, it is created and returned
   * @param {String} target
   * @returns {HTMLElement}
   */
    createPortalTarget (target, tag) {
      if (!canUseDOM) {
        return
      }
      const existingPortalElement = document.querySelector(target)

      if (existingPortalElement) {
        return existingPortalElement
      } else {
        const el = document.createElement(tag)
        if (target.startsWith('#')) {
          el.id = gs(target, '#')
        }
        if (target.startsWith('.')) {
          el.classList.add(gs(target, '.'))
          el.id = useId(4)
        }
        if (document.body != null) {
          document.body.appendChild(el)
        }
        return el
      }
    },
    mountTarget () {
      if (!canUseDOM) {
        return
      }
      this.portalTarget = this.createPortalTarget(this.target, this.as)
      this.targetId = this.portalTarget.id
      this.$forceUpdate() // Force re-render in case of changes.
      if (this.portalTarget && this.portalTarget.isConnected) {
        this.$nextTick(() => {
          this.$emit('portal:targetConnected')
        })
      }
    },
    unmountTarget () {
      if (!this.disabled) {
        (canUseDOM && this.portalTarget.isConnected) && document.body.removeChild(this.portalTarget)
      }
    }
  },
  render (h) {
    const children = this.$slots.default
    return !this.disabled ? h(CNoSsr, [
      h(MountingPortal, {
        props: {
          append: this.append,
          mountTo: `#${this.targetId}`,
          disabled: this.disabled,
          name: this.name,
          order: this.order,
          slim: this.slim,
          bail: this.bail,
          targetSlim: this.targetSlim
        },
        attrs: {
          'data-chakra-component': 'CPortal'
        }
      }, children)
    ]) : children[0]
  }
}

export default CPortal
