import { baseProps } from '../config/props'
import { forwardProps, cloneVNodeElement, cleanChildren } from '../utils'

import CBox from '../CBox'
import CLink from '../CLink'

const CBreadcrumbSeparator = {
  name: 'CBreadcrumbSeparator',
  props: {
    ...baseProps,
    spacing: [String, Number, Array],
    separator: [String, Object]
  },
  render (h) {
    return h(CBox, {
      props: {
        as: 'span',
        mx: this.spacing,
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'presentation'
      }
    }, [this.separator])
  }
}

const Span = {
  name: 'Span',
  props: {
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        as: 'span',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const CBreadcrumbLink = {
  name: 'CBreadcrumbLink',
  props: {
    ...baseProps,
    isCurrentPage: Boolean
  },
  render (h) {
    const Comp = this.isCurrentPage ? Span : CLink

    return h(Comp, {
      props: forwardProps(this.$props),
      attrs: {
        'aria-current': this.isCurrentPage ? 'page' : null
      }
    }, this.$slots.default)
  }
}

const CBreadcrumbItem = {
  name: 'BreadcrumbItem',
  props: {
    ...baseProps,
    isCurrentPage: Boolean,
    isLastChild: Boolean,
    separator: [Object, String],
    addSeparator: Boolean,
    spacing: [String, Number, Array]
  },
  render (h) {
    const children = this.$slots.default.filter(e => e.tag)
    const clones = children.map((vnode) => {
      if (vnode.componentOptions.tag === 'CBreadcrumbLink') {
        const clone = cloneVNodeElement(vnode, {
          props: {
            isCurrentPage: this.isCurrentPage
          }
        }, h)
        return clone
      }
      if (vnode.componentOptions.tag === 'CBreadcrumbSeparator') {
        const clone = cloneVNodeElement(vnode, {
          props: {
            spacing: this.spacing,
            separator: this.separator
          },
          children: vnode.componentOptions.children || this.separator
        }, h)
        return clone
      }
    })

    return h(CBox, {
      props: {
        display: 'inline-flex',
        alignItems: 'center',
        as: 'li'
      }
    }, [
      ...clones,
      !this.isLastChild && this.addSeparator && h(CBreadcrumbSeparator, {
        props: {
          spacing: this.spacing,
          separator: this.separator
        }
      })
    ])
  }
}

const CBreadcrumb = {
  name: 'Breadcrumb',
  props: {
    spacing: {
      type: [String, Number, Array],
      default: 2
    },
    addSeparator: {
      type: Boolean,
      default: true
    },
    separator: {
      type: [String, Object],
      default: '/'
    },
    ...baseProps
  },
  render (h) {
    const children = this.$slots.default
    if (!children) {
      console.error(
        `[Chakra-ui:Breadcrumb]: Breadcrumb component should have at least one child`
      )
      return null
    }
    const cleaned = cleanChildren(children)
    const clones = cleaned.map((node, index, array) => {
      return cloneVNodeElement(node, {
        props: {
          addSeparator: this.addSeparator,
          separator: this.separator,
          spacing: this.spacing,
          isLastChild: array.length === index + 1
        }
      }, h)
    })

    return h(CBox, {
      props: {
        as: 'nav',
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-label': 'breadcrumb'
      }
    }, [h(CBox, {
      props: {
        as: 'ol'
      }
    }, clones)])
  }
}

export {
  CBreadcrumbSeparator,
  CBreadcrumbLink,
  CBreadcrumbItem,
  CBreadcrumb
}
