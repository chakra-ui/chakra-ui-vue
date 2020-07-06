/**
 * Hey! Welcome to @chakra-ui/vue CircularProgress
 *
 * The Circular Progress component is used to indicates the progress for both determinate and indeterminate processes.
 *
 * @see Docs     https://vue.chakra-ui.com/circularprogress
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCircularProgress/CCircularProgress.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCircularProgress/accessibility.md
 */

import { createStyledAttrsMixin } from '../utils'
import CBox from '../CBox'
import { getComputedProps } from './utils/circularprogress.styles'

/**
 * CCircularProgress component
 *
 * The test label that displays the progress percentage in the `CCircularProgress`
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/circularprogress
 */
const CCircularProgressLabel = {
  mixins: [createStyledAttrsMixin('CCircularProgressLabel')],
  computed: {
    componentStyles () {
      return {
        position: 'absolute',
        left: '50%',
        top: '50%',
        lineHeight: '1',
        transform: 'translate(-50%, -50%)',
        fontSize: '0.25em'
      }
    }
  },
  render (h) {
    return h(this.as || 'div', {
      class: [this.className],
      style: {
        fontVariantNumeric: 'tabular-nums'
      },
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

/**
 * CCircularProgressLabel component
 *
 * Indicates the progress for both determinate and indeterminate processes.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/circularprogress
 */
const CCircularProgress = {
  name: 'CCircularProgress',
  functional: true,
  inject: ['$chakraColorMode'],
  props: {
    size: {
      type: String,
      default: '48px'
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      typs: Number,
      default: 0
    },
    isIndeterminate: Boolean,
    isTransitioned: {
      type: Boolean,
      default: true
    },
    thickness: {
      type: Number,
      default: 0.2
    },
    value: Number,
    angle: {
      type: Number,
      default: 0
    },
    capIsRound: Boolean,
    trackColor: {
      type: String,
      default: 'gray'
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  render (h, context) {
    const { data, injections, props, slots } = context
    const colorMode = injections.$chakraColorMode()

    const _trackColor = { light: `${props.trackColor}.100`, dark: 'whiteAlpha.300' }
    const _color = { light: `${props.color}.500`, dark: `${props.color}.200` }

    const {
      rootData,
      indicatorCircleData,
      svgData,
      trackCircleData
    } = getComputedProps({
      min: props.min,
      max: props.max,
      value: props.value,
      size: props.size,
      angle: props.angle,
      thickness: props.thickness,
      capIsRound: props.capIsRound,
      isIndeterminate: props.isIndeterminate,
      color: _color[colorMode],
      trackColor: _trackColor[colorMode],
      isTransitioned: props.isTransitioned
    })
    return h(CBox, {
      ...data,
      props,
      attrs: {
        ...rootData,
        ...data.attrs,
        'data-chakra-component': 'CCircularProgress'
      }
    }, [
      h(CBox, {
        props: { as: 'svg' },
        attrs: svgData
      }, [
        h(CBox, { props: { as: 'circle' }, attrs: trackCircleData }),
        h(CBox, { props: { as: 'circle' }, attrs: indicatorCircleData })
      ]),
      slots().default
    ])
  }
}

export {
  CCircularProgress,
  CCircularProgressLabel
}
