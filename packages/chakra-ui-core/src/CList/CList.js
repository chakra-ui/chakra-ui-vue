import { baseProps } from '../config'
import { cleanChildren, isDef, cloneVNodeElement, forwardProps } from '../utils'
import { SNA } from '../config/props/props.types'
import styleProps from '../config/props'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
import CIcon from '../CIcon'

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
      }
    }, clones)
  }
}

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
      }
    }, this.$slots.default)
  }
}

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
      }
    })
  }
}

export default CList
export {
  CListItem,
  CListIcon
}
