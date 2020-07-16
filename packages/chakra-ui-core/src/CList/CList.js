/**
 * Hey! Welcome to @chakra-ui/vue List
 *
 * `CList` is used to display list items
 *
 * @see Docs     https://vue.chakra-ui.com/list
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CList/CList.js
 */

import { cleanChildren, isDef, cloneVNodeElement, createStyledAttrsMixin } from '../utils'
import { SNA } from '../config/props/props.types'

import CIcon from '../CIcon'

/**
 * CList component
 *
 * The list container element
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/list
 */
const CList = {
  name: 'CList',
  mixins: [createStyledAttrsMixin('CList', true)],
  props: {
    styleType: {
      type: String,
      default: 'none'
    },
    stylePos: {
      type: String,
      default: 'inside'
    },
    spacing: SNA
  },
  computed: {
    componentStyles () {
      return {
        listStyleType: this.styleType,
        listStylePosition: this.stylePos
      }
    }
  },
  render (h) {
    const children = this.$slots.default
    if (!isDef(children)) {
      console.error('[Chakra-ui: List]: List component expects at east one child')
      return null
    }
    const validChildren = cleanChildren(children)

    const clones = validChildren.map((vnode, index) => {
      const isLast = index + 1 === validChildren.length
      if (isLast) {
        return vnode
      }

      const clone = cloneVNodeElement(vnode, {
        attrs: {
          mb: this.spacing
        }
      }, h)
      return clone
    })

    return h('ul', {
      class: [this.className],
      attrs: this.computedAttrs,
      on: this.computedListeners
    }, clones)
  }
}

/**
 * CListItem component
 *
 * The list item element
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/list
 */
const CListItem = {
  name: 'CListItem',
  mixins: [createStyledAttrsMixin('CListItem')],
  props: {
    spacing: SNA
  },
  computed: {
    componentStyles () {
      return {
        mb: this.spacing
      }
    }
  },
  render (h) {
    return h('li', {
      class: [this.className],
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

/**
 * CListIcon component
 *
 * The list item icon element
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/list
 */
const CListIcon = {
  name: 'CListIcon',
  functional: true,
  props: {
    icon: String
  },
  render (h, { props, data, ...rest }) {
    return h(CIcon, {
      ...rest,
      props: {
        name: props.icon
      },
      attrs: {
        mr: 2,
        ...data.attrs,
        'data-chakra-component': 'CListIcon'
      }
    })
  }
}

export default CList
export {
  CListItem,
  CListIcon
}
