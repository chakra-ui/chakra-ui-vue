import { canUseDOM } from '../utils'

const CClickOutside = {
  name: 'CClickOutside',
  props: {
    whitelist: Array,
    do: Function,
    isDisabled: Boolean
  },
  created () {
    if (!this.isDisabled) {
      const listener = (e, el) => {
        if (
          e.target === el ||
          el.contains(e.target) ||
          (this.whitelist.includes(e.target))
        ) return
        if (this.do) this.do()
      }

      canUseDOM && document.addEventListener('click', (e) => listener(e, this.$el))

      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('click', (e) => listener(e, this.$el))
      })
    }
  },
  render () {
    return this.$slots.default[0]
  }
}

export default CClickOutside
