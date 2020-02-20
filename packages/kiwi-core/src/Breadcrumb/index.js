import { ref, createElement as h } from '@vue/composition-api'
import { baseProps } from '../config/props'
import Box from '../Box'
import Link from '../Link'
import { forwardProps, cloneVNodes } from '../utils'

const BreadcrumbSeparator = {
  name: 'BreadcrumbSeparator',
  props: {
    spacing: [String, Number, Array],
    separator: [String, Object],
    ...baseProps
  },
  setup (props) {
    const innerRef = ref(null)

    return () => {
      return h(Box, {
        props: {
          as: 'span',
          mx: props.spacing,
          ...forwardProps(props)
        },
        attrs: {
          role: 'presentation'
        },
        ref: innerRef.value
      }, [props.separator])
    }
  }
}

const Span = {
  name: 'Span',
  props: {
    ...baseProps
  },
  setup (props, context) {
    const innerRef = ref(null)

    return () => {
      return h(Box, {
        props: {
          as: 'span',
          ...forwardProps(props)
        },
        ref: innerRef.value
      }, context.slots.default())
    }
  }
}

const BreadcrumbLink = {
  name: 'BreadcrumbLink',
  props: {
    isCurrentPage: Boolean,
    ...baseProps
  },
  setup (props, context) {
    const innerRef = ref(null)
    const Comp = props.isCurrentPage ? Span : Link

    return () => {
      return h(Comp, {
        props: {
          ...forwardProps(props)
        },
        attrs: {
          'aria-current': props.isCurrentPage ? 'page' : null
        },
        ref: innerRef.value
      }, context.slots.default())
    }
  }
}

const BreadcrumbItem = {
  name: 'BreadcrumbItem',
  props: {
    isCurrentPage: Boolean,
    isLastChild: Boolean,
    separator: [Object, String],
    addSeparator: Boolean,
    spacing: [String, Number, Array],
    ...baseProps
  },
  setup (props, context) {
    return () => {
      const children = context.slots.default().filter(e => e.tag)
      const clones = cloneVNodes(children, h).map((clone) => {
        if (clone.componentOptions.tag === BreadcrumbLink.name) {
          const { propsData } = clone.componentOptions
          propsData['isCurrentPage'] = props.isCurrentPage
          clone.componentOptions.propsData = propsData
          return clone
        }
        if (clone.componentOptions.tag === BreadcrumbSeparator.name) {
          const { propsData } = clone.componentOptions
          propsData['spacing'] = props.spacing
          propsData['separator'] = props.separator
          clone.componentOptions.children = clone.componentOptions.children || props.separator
          clone.componentOptions.propsData = propsData
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
        !props.isLastChild && props.addSeparator && h(BreadcrumbSeparator, {
          props: {
            spacing: props.spacing,
            separator: props.separator
          }
        })
      ])
    }
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
  setup (props, context) {
    return () => {
      const children = context.slots.default().filter(e => e.tag)
      const clones = cloneVNodes(children, h)
        .map((node, index, array) => {
          const { propsData } = node.componentOptions
          propsData['addSeparator'] = props.addSeparator
          propsData['separator'] = props.separator
          propsData['spacing'] = props.spacing
          propsData['isLastChild'] = array.length === index + 1
          node.componentOptions.propsData = propsData
          return node
        })

      return h(Box, {
        props: {
          as: 'nav',
          ...forwardProps(props)
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
}

export {
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb
}
