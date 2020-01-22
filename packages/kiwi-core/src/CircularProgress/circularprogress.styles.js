import { keyframes } from 'vue-styled-components'

export const circularProgressCircle = keyframes`
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300;
  }
`

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

/**
 * Computes styles for circular progress component. These styles were adapted from React's Chakra UI implementation by @thesegunadebayo
 * @param {{min: Number, max: Number, size: String|Number, value: Number, angle: Number, thickness: Number, trackColor: String, color: String, capIsRound: Boolean, isIndeterminate: Boolean}} param0
 * @returns {Object} CircularProgress styles object
 */
export function getComputedProps ({
  min,
  max,
  size,
  value,
  angle,
  thickness,
  trackColor,
  color,
  capIsRound,
  isIndeterminate
}) {
  let radius = 50
  let diameter = radius * 2
  let circumference = diameter * Math.PI
  let strokeDasharray = Math.round(circumference * 1000) / 1000

  let viewBox = diameter / (1 - thickness / 2)
  let viewBoxAttr = `${viewBox / 2} ${viewBox / 2} ${viewBox} ${viewBox}`
  let strokeWidth = (thickness / 2) * viewBox
  let progress = 1 - (value - min) / (max - min)
  let strokeDashoffset = progress * circumference

  function getCircleProps ({ thickness, offset, color }) {
    return {
      props: {
        as: 'circle',
        color,
        fill: 'transparent',
        stroke: 'currentColor'
      },
      attrs: {
        'stroke-width': thickness,
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': offset,
        cx: viewBox,
        cy: viewBox,
        r: radius
      }
    }
  }

  return {
    rootData: {
      props: {
        width: '1em',
        height: '1em',
        fontSize: size,
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle'
      },
      attrs: {
        role: 'progressbar',
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': isIndeterminate ? null : value
      }

    },

    svgData: {
      props: {
        as: 'svg',
        verticalAlign: 'top',
        transform: `rotate3d(0, 0, 1, ${angle - 90}deg)`,
        width: '100%',
        height: '100%',
        ...(isIndeterminate && {
          transformOrigin: '50% 50%',
          animation: `${spin} 2s linear infinite`
        }),
        attrs: {
          viewBox: viewBoxAttr
        }
      }
    },

    trackCircleData: getCircleProps({
      thickness: strokeWidth,
      offset: 0,
      color: trackColor
    }),

    indicatorCircleData: {
      attrs: {
        ...(capIsRound && { strokeLinecap: 'round' }),
        ...(isIndeterminate && {
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
          animation: `${circularProgressCircle} 1.5s ease-in-out infinite`,
          strokeDasharray: '1 400',
          strokeDashoffset: '0'
        }),
        ...getCircleProps({
          thickness: strokeWidth,
          offset: strokeDashoffset,
          color: color
        }).attrs
      },
      props: {
        stroke: 'currentColor',
        ...getCircleProps({
          thickness: strokeWidth,
          offset: strokeDashoffset,
          color: color
        }).props
      }
    }
  }
}
