/**
 * Hey! Welcome to @chakra-ui/vue CClickOutside
 *
 * The Click Outside component is used to call an event if a user clicks anywhere outside this element.
 * It also accepts a whitelist of elements to ignore when the `do()` function is called.
 *
 * Note:
 * This component is mostly used for internal use, and is not listed in Chakra UI Vue docs.
 *
 **/

import { canUseDOM } from '../utils'

/**
 * CClickOutside component
 *
 * The component that listens to DOM click events and
 * executes a function based on component props and whitelisted nodes.
 *
 */
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
