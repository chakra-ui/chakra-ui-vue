/**
 * Hey! Welcome to @chakra-ui/vue NoSsr
 *
 * This component is used to defer the rendering of it's children to the client-side.
 *
 * This component is a modification of the fine work of @egoist
 * @see https://github.com/egoist/vue-client-only/blob/master/src/index.js
 */

const NoSsr = {
  name: 'NoSsr',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  render (h, { parent, slots, props }) {
    const { default: defaultSlot = [], placeholder: placeholderSlot } = slots()

    if (parent._isMounted) {
      return defaultSlot
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['client-only-placeholder'],
          attrs: {
            'data-chakra-component': 'CNoSsr'
          }
        },
        props.placeholder || placeholderSlot
      )
    }

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(() => h(false)) : h(false)
  }
}

export default NoSsr
