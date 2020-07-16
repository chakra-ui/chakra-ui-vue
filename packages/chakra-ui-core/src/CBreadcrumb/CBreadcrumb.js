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

import { cloneVNodeElement, cleanChildren, kebabify, createStyledAttrsMixin, forwardProps } from '../utils'

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
  mixins: [createStyledAttrsMixin('CBreadcrumbSeparator')],
  props: {
    spacing: [String, Number, Array],
    separator: [String, Object]
  },
  computed: {
    componentStyles () {
      return {
        mx: this.spacing
      }
    }
  },
  render (h) {
    return h('span', {
      class: this.className,
      attrs: {
        role: 'presentation',
        ...this.computedAttrs
      },
      on: this.computedListeners
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
  functional: true,
  render (h, { data, slots, ...rest }) {
    return h(CBox, {
      ...rest,
      props: {
        as: 'span'
      },
      attrs: data.attrs
    }, slots().default)
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
  mixins: [createStyledAttrsMixin('CBreadcrumbLink', true)],
  props: {
    isCurrentPage: Boolean,
    as: [String, Object],
    to: String
  },
  computed: {
    component () {
      return this.isCurrentPage ? Span : CLink
    }
  },
  render (h) {
    return h(this.component, {
      class: this.className,
      props: forwardProps(this.$props),
      attrs: {
        'aria-current': this.isCurrentPage ? 'page' : null,
        ...this.computedAttrs
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
  mixins: [createStyledAttrsMixin('CBreadcrumbItem')],
  props: {
    isCurrentPage: Boolean,
    isLastChild: Boolean,
    separator: [Object, String],
    addSeparator: Boolean,
    spacing: [String, Number, Array]
  },
  computed: {
    componentStyles () {
      return {
        display: 'inline-flex',
        alignItems: 'center'
      }
    }
  },
  render (h) {
    const children = this.$slots.default.filter(e => e.tag)
    const clones = children.map((vnode) => {
      // If vnode is breadcrumb separator
      // i.e. (is reactive component)
      if (vnode.componentOptions) {
        // Kebabify to normalize tage name
        const tag = kebabify(vnode.componentOptions.tag)
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

        if (tag === 'c-breadcrumb-link') {
          const clone = cloneVNodeElement(vnode, {
            props: {
              isCurrentPage: this.isCurrentPage
            }
          }, h)
          return clone
        }
      }
    })

    return h('li', {
      class: this.className,
      attrs: this.computedAttrs,
      on: this.computedListeners
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
  mixins: [createStyledAttrsMixin('CBreadcrumb')],
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
    }
  },
  render (h) {
    const children = this.$slots.default
    if (!children) {
      console.error(
        '[Chakra-ui:Breadcrumb]: Breadcrumb component should have at least one child'
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

    return h('nav', {
      class: this.className,
      attrs: {
        'aria-label': 'breadcrumb',
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, [h('ol', clones)])
  }
}

export {
  CBreadcrumbSeparator,
  CBreadcrumbLink,
  CBreadcrumbItem,
  CBreadcrumb
}
