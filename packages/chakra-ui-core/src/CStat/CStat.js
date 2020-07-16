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
  functional: true,
  render (h, { props, slots, data, ...rest }) {
    const children = cleanChildren(slots().default)
    return h(CBox, {
      ...rest,
      props: { as: props.as },
      attrs: {
        flex: 1,
        pr: 4,
        position: 'relative',
        ...(data.attrs || {}),
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
  functional: true,
  props: CFlex.props,
  render (h, { props, slots, data, ...rest }) {
    const children = cleanChildren(slots().default)
    return h(CFlex, {
      ...rest,
      props: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        ...forwardProps(props)
      },
      attrs: {
        ...(data.attrs || {}),
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
  functional: true,
  props: {
    ...CIcon.props,
    type: {
      type: String,
      default: 'increase'
    }
  },
  render (h, { props, slots, data, ...rest }) {
    return h(CIcon, {
      ...rest,
      props: {
        size: '14px',
        ...arrowOptions[props.type],
        ...forwardProps(props)
      },
      attrs: {
        mr: 1,
        verticalAlign: 'middle',
        ...(data.attrs || {}),
        color: arrowOptions[props.type].color,
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
  functional: true,
  props: CText.props,
  render (h, { props, slots, data, ...rest }) {
    return h(CText, {
      ...rest,
      props: forwardProps(props),
      attrs: {
        fontSize: '2xl',
        verticalAlign: 'baseline',
        fontWeight: 'semibold',
        ...(data.attrs || {}),
        'data-chakra-component': 'CStatNumber'
      }
    }, slots().default)
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
  functional: true,
  props: CText.props,
  render (h, { props, slots, data, ...rest }) {
    return h(CText, {
      ...rest,
      props: forwardProps(props),
      attrs: {
        fontSize: 'sm',
        opacity: 0.8,
        mb: 2,
        ...(data.attrs || {}),
        'data-chakra-component': 'CStatHelperText'
      }
    }, slots().default)
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
  functional: true,
  props: CText.props,
  render (h, { props, slots, data, ...rest }) {
    return h(CText, {
      ...rest,
      props: forwardProps(props),
      attrs: {
        fontWeight: 'medium',
        fontSize: 'sm',
        ...(data.attrs || {}),
        'data-chakra-component': 'CStatLabel'
      }
    }, slots().default)
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
