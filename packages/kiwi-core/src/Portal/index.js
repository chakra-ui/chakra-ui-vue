import { createPortalTarget } from './utils'

/**
 * This portal was adapted from the awesome work of @linusborg with `portal-vue`
 * @see https://portal-vue.linusb.org/
 */
const Portal = {
  inheritAttrs: false,
  name: 'Portal',
  data () {
    return {
      target: undefined,
      targetSelector: undefined
    }
  },
  props: {
    targetNode: String,
    append: Boolean
  },
  created () {
    this.target = createPortalTarget(this.targetNode)
    this.targetSelector = `#${this.target.id}`
  },
  render (h) {
    return h('mounting-portal', {
      props: {
        ...this.$attrs,
        mountTo: `${this.targetSelector}`,
        append: this.append
      }
    }, this.$slots.default)
  }
}

export default Portal
