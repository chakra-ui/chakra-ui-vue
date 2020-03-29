import { cleanChildren, forwardProps } from '../utils'

import CIcon from '../CIcon'
import CBox from '../CBox'
import CFlex from '../CFlex'
import CText from '../CText'

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
const CStat = {
  name: 'CStat',
  extends: CBox,
  render (h) {
    const children = cleanChildren(this.$slots.default)
    return h(CBox, {
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
const CStatGroup = {
  name: 'CStatGroup',
  extends: CFlex,
  render (h) {
    const children = cleanChildren(this.$slots.default)
    return h(CFlex, {
      props: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        ...forwardProps(this.$props)
      }
    }, children)
  }
}

const CStatArrow = {
  name: 'CStatArrow',
  extends: CIcon,
  props: {
    type: {
      type: String,
      default: 'increase'
    }
  },
  render (h) {
    return h(CIcon, {
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
const CStatNumber = {
  name: 'CStatNumber',
  extends: Text,
  render (h) {
    return h(CText, {
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
const CStatHelperText = {
  name: 'CStatHelperText',
  extends: CText,
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
const CStatLabel = {
  name: 'CStatLabel',
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
  CStat,
  CStatGroup,
  CStatArrow,
  CStatNumber,
  CStatHelperText,
  CStatLabel
}
