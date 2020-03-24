import Box from '../Box'
import PseudoBox from '../PseudoBox'
import Icon from '../Icon'
import { cleanChildren, isDef, cloneVNodeElement, forwardProps } from '../utils'
import { SNA } from '../config/props/props.types'

const List = {
  name: 'List',
  extends: Box,
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

    return h(Box, {
      props: {
        as: 'ul',
        listStyleType: this.styleType,
        listStylePosition: this.stylePos,
        ...forwardProps(this.$props)
      }
    }, clones)
  }
}

const ListItem = {
  name: 'ListItem',
  extends: PseudoBox,
  props: {
    spacing: SNA
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        as: 'li',
        mb: this.spacing
      }
    }, this.$slots.default)
  }
}

const ListIcon = {
  name: 'ListIcon',
  extends: Box,
  props: {
    icon: String
  },
  render (h) {
    return h(Icon, {
      props: {
        name: this.icon,
        mr: 2,
        ...forwardProps(this.$props)
      }
    })
  }
}

export default List
export {
  ListItem,
  ListIcon
}
