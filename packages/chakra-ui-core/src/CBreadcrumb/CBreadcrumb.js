/**
 * Hey! Welcome to @chakra-ui/vue Breadcrumb
 *
 * Breadcrumbs, or a breadcrumb navigation, can help to enhance
 * how users navigate to previous page levels of a website,
 * especially if that website has many pages or products.
 *
 * A breadcrumb trail consists of a list of links to the parent pages
 * of the current page in hierarchical order. It helps users find their
 * place within a website or web application. Breadcrumbs are often
 * placed horizontally before a page's main content.
 *
 * @see Docs     https://vue.chakra-ui.com/breadcrumb
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBreadcrumb/CBreadcrumb.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBreadcrumb/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb
 */

import { baseProps } from '../config/props'
import { forwardProps, cloneVNodeElement, cleanChildren, kebabify } from '../utils'

import CBox from '../CBox'
import CLink from '../CLink'

/**
* CBreadcrumbSeparator component
*
* The visual separator between each breadcrumb link
*
* @see Docs https://vue.chakra-ui.com/breadcrumb
*/
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
        role: 'presentation',
        'data-chakra-component': 'CBreadcrumbSeparator'
      }
    }, [this.separator])
  }
}

/**
* Span component
*
* Wrapper for text breadcrumbs
*
* @see Docs https://vue.chakra-ui.com/breadcrumb
*/
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

/**
* CBreadcrumbLink component
*
* The breadcrumb link
*
* @see Docs https://vue.chakra-ui.com/breadcrumb
*/
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
        'aria-current': this.isCurrentPage ? 'page' : null,
        'data-chakra-component': 'CBreadcrumbLink'
      }
    }, this.$slots.default)
  }
}

/**
* CBreadcrumbItem component
*
* Individual breadcrumb element containing a link and a divider.
*
* @see Docs https://vue.chakra-ui.com/breadcrumb
*/
const CBreadcrumbItem = {
  name: 'CBreadcrumbItem',
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
      // Kebabify to normalize tage names
      const tag = kebabify(vnode.componentOptions.tag)
      if (tag === 'c-breadcrumb-link') {
        const clone = cloneVNodeElement(vnode, {
          props: {
            isCurrentPage: this.isCurrentPage
          }
        }, h)
        return clone
      }
      if (tag === 'c-breadcrumb-separator') {
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
      },
      attrs: {
        'data-chakra-component': 'CBreadcrumbItem'
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

/**
* CBreadcrumb component
*
* The wrapper container for all breadcrumbs
*
* @see Docs https://vue.chakra-ui.com/breadcrumb
*/
const CBreadcrumb = {
  name: 'CBreadcrumb',
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
        'aria-label': 'breadcrumb',
        'data-chakra-component': 'CBreadcrumb'
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
