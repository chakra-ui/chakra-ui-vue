import styleProps from '../../chakra-ui-core/src/config/props'

/**
 * WIP Component link
 */
const ComponentLink = {
  name: 'ComponentLink',
  props: {
    ...styleProps,
    to: [String, Object]
  },
  render (h) {
    // const linkStyles = {

    // }

    return h('nuxt-link', {
      to: this.to
    }, this.$slots.default)
  }
}

export default ComponentLink
