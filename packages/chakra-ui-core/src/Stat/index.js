import Box from '../Box'
import Flex from '../Flex'
import { cleanChildren, forwardProps } from '../utils'
import Icon from '../Icon'
import Text from '../Text'

/**
 * Stat Arrow options
 */
const arrowOptions = {
  increase: {
    name: 'triangle-up',
    color: 'green.400'
  },
  decrease: {
    name: 'triangle-down',
    color: 'red.400'
  }
}

/**
 * Stat component
 */
const Stat = {
  name: 'Stat',
  extends: Box,
  render (h) {
    const children = cleanChildren(this.$slots.default)
    return h(Box, {
      props: {
        flex: 1,
        pr: 4,
        position: 'relative',
        ...forwardProps(this.$props)
      }
    }, children)
  }
}

/**
 * StatGroup component
 */
const StatGroup = {
  name: 'StatGroup',
  extends: Flex,
  render (h) {
    const children = cleanChildren(this.$slots.default)
    return h(Flex, {
      props: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        ...forwardProps(this.$props)
      }
    }, children)
  }
}

const StatArrow = {
  name: 'StatArrow',
  extends: Icon,
  props: {
    type: {
      type: String,
      default: 'increase'
    }
  },
  render (h) {
    return h(Icon, {
      props: {
        mr: 1,
        size: '14px',
        verticalAlign: 'middle',
        ...arrowOptions[this.type],
        ...forwardProps(this.$props)
      }
    })
  }
}

/**
 * StatNumber compoennt
 */
const StatNumber = {
  name: 'StatNumber',
  extends: Text,
  render (h) {
    return h(Text, {
      props: {
        fontSize: '2xl',
        verticalAlign: 'baseline',
        fontWeight: 'semibold',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

/**
 * StatHelperText component
 */
const StatHelperText = {
  name: 'StatHelperText',
  extends: Text,
  render (h) {
    return h(Text, {
      props: {
        fontSize: 'sm',
        opacity: 0.8,
        mb: 2,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

/**
 * StatLabel component
 */
const StatLabel = {
  name: 'StatLabel',
  extends: Text,
  render (h) {
    return h(Text, {
      props: {
        fontWeight: 'medium',
        fontSize: 'sm',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

export {
  Stat,
  StatGroup,
  StatArrow,
  StatNumber,
  StatHelperText,
  StatLabel
}
