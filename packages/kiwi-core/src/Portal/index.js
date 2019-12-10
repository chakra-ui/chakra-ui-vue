import { createPortalTarget } from './utils'

/**
 * This portal was adapted from the awesome work of @linusborg with `portal-vue`
 * @see https://linusborg.github.io/portal-vue/
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
    targetNode: String
  },
  created () {
    this.target = createPortalTarget(this.targetNode)
    this.targetSelector = `#${this.target.id}`
    console.log({ target: this.target })
  },
  render (h) {
    return h('mounting-portal', {
      props: {
        ...this.$attrs,
        mountTo: `${this.targetSelector}`
      }
    }, [this.$slots.default])
  }
}

export default Portal
