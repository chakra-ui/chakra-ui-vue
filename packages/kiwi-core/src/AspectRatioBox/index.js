import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import { cloneVNode, forwardProps } from '../utils'

const AspectRatioBox = {
  name: 'AspectRatioBox',
  props: {
    ...styleProps,
    ratio: {
      type: Number,
      default: 4 / 3
    }
  },
  render (h) {
    const child = this.$slots.default[0]
    if (!child) return
    let vnode = cloneVNode(child, h)
    const clone = h(vnode.componentOptions.Ctor, {
      ...vnode.data,
      ...(vnode.componentOptions.listeners || {}),
      props: {
        ...(vnode.data.props || {}),
        ...vnode.componentOptions.propsData,
        position: 'absolute',
        w: 'full',
        h: 'full',
        top: 0,
        left: 0
      }
    })

    return h(PseudoBox, {
      props: {
        ...forwardProps(this.$props),
        position: 'relative',
        _before: {
          h: '0px',
          content: `""`,
          d: 'block',
          pb: `${(1 / this.ratio) * 100}%`
        }
      }
    }, [clone])
  }
}

export default AspectRatioBox
