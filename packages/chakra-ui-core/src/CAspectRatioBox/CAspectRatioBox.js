/**
 * Hey! Welcome to @chakra-ui/vue AspectRatioBox
 *
 * AspectRatioBox component is used to embed responsive
 * videos and maps, etc. It uses a very common [padding hack](https://css-tricks.com/aspect-ratio-boxes/) to achieve this.
 *
 * There are times when it comes in handy to build a box
 * with a specific aspect ratio, given a certain width.
 * This utility component applies CSS to ::before pseudo-element
 * in order to achieve set aspect ratio.
 *
 * @see Docs     https://vue.chakra-ui.com/aspectratiobox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAspectRatioBox/CAspectRatioBox.js
 */

import { cloneVNode, createStyledAttrsMixin } from '../utils'

/**
 * CAspectRatioBox component
 *
 * The wrapper that clones it's children
 * to achieve the set aspect ratio.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/aspectratiobox
 */
const CAspectRatioBox = {
  mixins: [createStyledAttrsMixin('CAspectRatioBox', true)],
  props: {
    ratio: {
      type: Number,
      default: 4 / 3
    }
  },
  computed: {
    componentStyles () {
      return {
        position: 'relative',
        _before: {
          h: '0px',
          content: '""',
          d: 'block',
          pb: `${(1 / this.ratio) * 100}%`
        }
      }
    }
  },
  render (h) {
    const child = this.$slots.default[0]
    if (!child) return
    const vnode = cloneVNode(child, h)
    const clone = h(vnode.componentOptions.Ctor, {
      ...vnode.data,
      ...(vnode.componentOptions.listeners || {}),
      props: {
        ...(vnode.data.props || {}),
        ...vnode.componentOptions.propsData
      },
      attrs: {
        position: 'absolute',
        w: 'full',
        h: 'full',
        top: 0,
        left: 0,
        ...vnode.data.attrs
      }
    })

    return h('div', {
      class: this.className,
      attrs: this.computedAttrs,
      on: this.computedListeners
    }, [clone])
  }
}

export default CAspectRatioBox
