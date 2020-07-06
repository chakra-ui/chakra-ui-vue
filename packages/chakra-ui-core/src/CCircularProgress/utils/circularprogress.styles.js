import { keyframes } from 'emotion'

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
  isIndeterminate,
  isTransitioned
}) {
  const radius = 50
  const diameter = radius * 2
  const circumference = diameter * Math.PI
  const strokeDasharray = Math.round(circumference * 1000) / 1000

  const viewBox = diameter / (1 - thickness / 2)
  const viewBoxAttr = `${viewBox / 2} ${viewBox / 2} ${viewBox} ${viewBox}`
  const strokeWidth = (thickness / 2) * viewBox
  const progress = 1 - (value - min) / (max - min)
  const strokeDashoffset = progress * circumference

  function getCircleProps ({ thickness, offset, color }) {
    return {
      color,
      fill: 'transparent',
      stroke: 'currentColor',
      ...isTransitioned && { transition: 'all 250ms' },
      'stroke-width': thickness,
      'stroke-dasharray': strokeDasharray,
      'stroke-dashoffset': offset,
      cx: viewBox,
      cy: viewBox,
      r: radius
    }
  }

  return {
    rootData: {
      width: '1em',
      height: '1em',
      fontSize: size,
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'middle',
      role: 'progressbar',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': isIndeterminate ? null : value
    },

    svgData: {
      viewBox: viewBoxAttr,
      verticalAlign: 'top',
      transform: `rotate3d(0, 0, 1, ${angle - 90}deg)`,
      width: '100%',
      height: '100%',
      ...(isIndeterminate && {
        transformOrigin: '50% 50%',
        animation: `${spin} 2s linear infinite`
      })
    },

    trackCircleData: getCircleProps({
      thickness: strokeWidth,
      offset: 0,
      color: trackColor
    }),

    indicatorCircleData: {
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
        color
      }),
      ...isTransitioned && { transition: 'all 250ms' },
      stroke: 'currentColor',
      ...getCircleProps({
        thickness: strokeWidth,
        offset: strokeDashoffset,
        color
      })
    }
  }
}
