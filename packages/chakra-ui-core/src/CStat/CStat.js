/**
 * Hey! Welcome to @chakra-ui/vue Stat
 *
 * The Stat component is used to display a single statistic.
 *
 * @see Docs     https://vue.chakra-ui.com/stat
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CStat/CStat.js
 */

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
 * CStat component
 *
 * Stat wrapper component for it's children
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/stat
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
      },
      attrs: {
        'data-chakra-component': 'CStat'
      }
    }, children)
  }
}

/**
 * CStatGroup component
 *
 * group component for stat
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/stat
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
      },
      attrs: {
        'data-chakra-component': 'CStatGroup'
      }
    }, children)
  }
}

/**
 * CStatArrow component
 *
 * Arrow component for stat
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/stat
 */
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
      },
      attrs: {
        'data-chakra-component': 'CStatArrow'
      }
    })
  }
}

/**
 * CStatNumber component
 *
 * number component for stat
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/stat
 */
const CStatNumber = {
  name: 'CStatNumber',
  extends: CText,
  render (h) {
    return h(CText, {
      props: {
        fontSize: '2xl',
        verticalAlign: 'baseline',
        fontWeight: 'semibold',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CStatNumber'
      }
    }, this.$slots.default)
  }
}

/**
 * CStatHelperText component
 *
 * text component for stat
 *
 * @extends CText
 * @see Docs https://vue.chakra-ui.com/stat
 */
const CStatHelperText = {
  name: 'CStatHelperText',
  extends: CText,
  render (h) {
    return h(CText, {
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
 * CStatLabel component
 *
 * label text component for stat
 *
 * @extends CText
 * @see Docs https://vue.chakra-ui.com/stat
 */
const CStatLabel = {
  name: 'CStatLabel',
  extends: CText,
  render (h) {
    return h(CText, {
      props: {
        fontWeight: 'medium',
        fontSize: 'sm',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CStatLabel'
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
