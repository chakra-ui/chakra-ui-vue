import { baseProps } from '../config/props'
import Box from '../Box'
import Link from '../Link'
import { forwardProps, cloneVNodeElement, cleanChildren } from '../utils'

const BreadcrumbSeparator = {
  name: 'BreadcrumbSeparator',
  props: {
    ...baseProps,
    spacing: [String, Number, Array],
    separator: [String, Object]
  },
  render (h) {
    return h(Box, {
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
    return h(Box, {
      props: {
        as: 'span',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const BreadcrumbLink = {
  name: 'BreadcrumbLink',
  props: {
    ...baseProps,
    isCurrentPage: Boolean
  },
  render (h) {
    const Comp = this.isCurrentPage ? Span : Link

    return h(Comp, {
      props: forwardProps(this.$props),
      attrs: {
        'aria-current': this.isCurrentPage ? 'page' : null
      }
    }, this.$slots.default)
  }
}

const BreadcrumbItem = {
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
      if (vnode.componentOptions.tag === BreadcrumbLink.name) {
        const clone = cloneVNodeElement(vnode, {
          props: {
            isCurrentPage: this.isCurrentPage
          }
        }, h)
        return clone
      }
      if (vnode.componentOptions.tag === BreadcrumbSeparator.name) {
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

    return h(Box, {
      props: {
        display: 'inline-flex',
        alignItems: 'center',
        as: 'li'
      }
    }, [
      ...clones,
      !this.isLastChild && this.addSeparator && h(BreadcrumbSeparator, {
        props: {
          spacing: this.spacing,
          separator: this.separator
        }
      })
    ])
  }
}

const Breadcrumb = {
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

    return h(Box, {
      props: {
        as: 'nav',
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-label': 'breadcrumb'
      }
    }, [h(Box, {
      props: {
        as: 'ol'
      }
    }, clones)])
  }
}

export {
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb
}
