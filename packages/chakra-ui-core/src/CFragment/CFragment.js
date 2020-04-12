/**
 * Fragment component to render multiple child sibling nodes in the place of
 * their parent in the DOM.
 * Note: This is a temporary solution to create fragments in Vue 2
 * until Vue 3 releases internal Fragment support
 */
const CFragment = {
  name: 'CFragment',
  directives: {
    fragment: {
      inserted (el) {
        const fragment = document.createDocumentFragment()
        Array.from(el.childNodes).forEach(child =>
          fragment.appendChild(child)
        )
        el.parentNode.insertBefore(fragment, el)
        el.parentNode.removeChild(el)
      }
    }
  },
  render (h) {
    // Here we render div but will remove it when node is inserted.
    // And replace it with children
    return h('div', {
      directives: [{ name: 'fragment' }]
    }, this.$slots.default)
  }
}

export default CFragment
