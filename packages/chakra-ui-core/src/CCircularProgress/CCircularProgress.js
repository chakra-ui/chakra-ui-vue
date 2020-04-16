/**
 * Hey! Welcome to @chakra-ui/vue CircularProgress
 *
 * The Circular Progress component is used to indicates the progress for both determinate and indeterminate processes.
 *
 * @see Docs     https://vue.chakra-ui.com/circularprogress
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCircularProgress/CCircularProgress.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCircularProgress/accessibility.md
 */


import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { getComputedProps } from './utils/circularprogress.styles'

import CBox from '../CBox'

/**
 * CCircularProgress component
 *
 * The test label that displays the progress percentage in the `CCircularProgress`
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/circularprogress
 */
const CCircularProgressLabel = {
  name: 'CCircularProgressLabel',
  props: baseProps,
  render (h) {
    return h(CBox, {
      style: {
        fontVariantNumeric: 'tabular-nums'
      },
      props: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        lineHeight: '1',
        transform: 'translate(-50%, -50%)',
        fontSize: '0.25em',
        ...forwardProps(this.$props)
      }
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
  inject: ['$chakraColorMode'],
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  props: {
    ...baseProps,
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
  render (h) {
    const _trackColor = { light: `${this.trackColor}.100`, dark: 'whiteAlpha.300' }
    const _color = { light: `${this.color}.500`, dark: `${this.color}.200` }

    const {
      rootData,
      indicatorCircleData,
      svgData,
      trackCircleData
    } = getComputedProps({
      min: this.min,
      max: this.max,
      value: this.value,
      size: this.size,
      angle: this.angle,
      thickness: this.thickness,
      capIsRound: this.capIsRound,
      isIndeterminate: this.isIndeterminate,
      color: _color[this.colorMode],
      trackColor: _trackColor[this.colorMode],
      isTransitioned: this.isTransitioned
    })

    return h(CBox, {
      props: {
        ...rootData.props,
        ...forwardProps(this.$props)
      },
      attrs: rootData.attrs
    }, [
      h(CBox, {
        props: svgData.props,
        attrs: svgData.attrs
      }, [
        h(CBox, { props: trackCircleData.props, attrs: trackCircleData.attrs }),
        h(CBox, { props: indicatorCircleData.props, attrs: indicatorCircleData.attrs })
      ]),
      this.$slots.default
    ])
  }
}

export {
  CCircularProgress,
  CCircularProgressLabel
}
