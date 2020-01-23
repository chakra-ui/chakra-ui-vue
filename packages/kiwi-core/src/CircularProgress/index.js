import Box from '../Box'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { getComputedProps } from './circularprogress.styles'

const CircularProgressLabel = {
  name: 'CircularProgressLabel',
  props: baseProps,
  render (h) {
    return h(Box, {
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

const CircularProgress = {
  name: 'CircularProgress',
  inject: ['$colorMode'],
  computed: {
    colorMode () {
      return this.$colorMode()
    }
  },
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
    },
    ...baseProps
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

    return h(Box, {
      props: {
        ...rootData.props,
        ...forwardProps(this.$props)
      },
      attrs: rootData.attrs
    }, [
      h(Box, {
        props: svgData.props,
        attrs: svgData.attrs
      }, [
        h(Box, { props: trackCircleData.props, attrs: trackCircleData.attrs }),
        h(Box, { props: indicatorCircleData.props, attrs: indicatorCircleData.attrs })
      ]),
      this.$slots.default
    ])
  }
}

export {
  CircularProgress,
  CircularProgressLabel
}
