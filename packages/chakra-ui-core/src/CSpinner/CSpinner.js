import { keyframes } from 'emotion'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const sizes = {
  xs: {
    w: '0.75rem',
    h: '0.75rem'
  },
  sm: {
    w: '1rem',
    h: '1rem'
  },
  md: {
    w: '1.5rem',
    h: '1.5rem'
  },
  lg: {
    w: '2rem',
    h: '2rem'
  },
  xl: {
    w: '3rem',
    h: '3rem'
  }
}

const createCustomSize = (size) => {
  return {
    w: size,
    h: size
  }
}

const setSizes = (props) => {
  return sizes[props.size] || createCustomSize(props.size)
}

const CSpinner = {
  name: 'CSpinner',
  props: {
    size: {
      type: [String, Array],
      default: 'md'
    },
    label: {
      type: String,
      default: 'Loading...'
    },
    thickness: {
      type: [String, Array],
      default: '2px'
    },
    speed: {
      type: [String, Array],
      default: '0.45s'
    },
    color: {
      type: [String, Array],
      default: 'gray.200'
    },
    emptyColor: {
      type: [String, Array],
      default: 'transparent'
    },
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        d: 'inline-block',
        borderWidth: this.thickness,
        borderColor: 'currentColor',
        borderStyle: 'solid',
        rounded: 'full',
        color: this.color,
        borderBottomColor: this.emptyColor,
        borderLeftColor: this.emptyColor,
        animation: `${spin} ${this.speed} linear infinite`,
        ...setSizes(this.$props),
        ...forwardProps(this.$props)
      }
    }, this.label && h(CVisuallyHidden, {}, this.label))
  }
}

export default CSpinner
