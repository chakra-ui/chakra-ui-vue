/**
 * Hey! Welcome to @chakra-ui/vue List
 *
 * `CList` is used to display list items
 *
 * @see Docs     https://vue.chakra-ui.com/list
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CList/CList.js
 */

import { baseProps } from '../config'
import { cleanChildren, isDef, cloneVNodeElement, forwardProps } from '../utils'
import { SNA } from '../config/props/props.types'
import styleProps from '../config/props'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
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
  props: {
    ...baseProps,
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

      return cloneVNodeElement(vnode, {
        props: {
          spacing: this.spacing
        }
      }, h)
    })

    return h(CBox, {
      props: {
        as: 'ul',
        listStyleType: this.styleType,
        listStylePosition: this.stylePos,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CList'
      }
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
  props: {
    ...styleProps,
    spacing: SNA
  },
  render (h) {
    return h(CPseudoBox, {
      props: {
        as: 'li',
        mb: this.spacing
      },
      attrs: {
        'data-chakra-component': 'CListItem'
      }
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
  props: {
    ...baseProps,
    icon: String
  },
  render (h) {
    return h(CIcon, {
      props: {
        name: this.icon,
        mr: 2,
        ...forwardProps(this.$props)
      },
      attrs: {
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
