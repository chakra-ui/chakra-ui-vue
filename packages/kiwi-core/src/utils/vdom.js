import { isDef } from './validators'

/**
 * Clones a single VNode
 * @param {Vue.VNode} vnodes VNode to be cloned
 * @param {Function} createElement Render function
 * @returns {Vue.VNode} Cloned VNodes
 */
export function cloneVNode (vnode, createElement) {
  const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode, createElement))
  const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
  cloned.text = vnode.text
  cloned.isComment = vnode.isComment
  cloned.componentOptions = vnode.componentOptions
  cloned.elm = vnode.elm
  cloned.context = vnode.context
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  return cloned
}

/**
 * Clones an array of VNodes
 * @param {Array<Vue.VNode>} vnodes Array of VNodes to be cloned
 * @param {Function} createElement Render function
 * @returns {Array<Vue.VNode>} Cloned VNodes Array
 */
export function cloneVNodes (vnodes, createElement) {
  const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode, createElement))
  return clonedVNodes
}

/**
 * Clones VNode with merged data
 * @param {Vue.VNode} vnode VNode
 * @param {Object} data VNode data
 * @param {Function} h Render function
 */
export function cloneVNodeElement (vnode, { props, ...rest }, h) {
  const cloned = cloneVNode(vnode, h)
  return h(cloned.componentOptions.Ctor, {
    ...cloned.data,
    ...(cloned.componentOptions.listeners || {}),
    props: {
      ...(cloned.data.props || {}),
      ...cloned.componentOptions.propsData,
      ...props
    },
    ...rest
  }, cloned.componentOptions.children)
}

/**
 * Checks whether a vnode is an async placeholder
 * @param {Vue.VNode} node
 * @returns {Boolean}
 */
function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/**
 * Get's the first child component VNode from an array of VNodes
 * @param {Array<Vue.VNode>} children
 * @returns {Vue.VNode}
 */
export function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}
