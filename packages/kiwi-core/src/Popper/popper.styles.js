import { css } from 'emotion'

/**
 * Evaluates popper arrow styles
 * @param {{ arrowSize: String, arrowShadowColor: String, hasArrow: Boolean}} props
 * @returns {String} Popper Arrow styles
 */
const getPopperArrowStyle = ({
  arrowSize = '1rem',
  arrowShadowColor = 'rgba(0, 0, 0, 0.1)',
  hasArrow = true
}) => {
  const popoverMargin = hasArrow ? `calc(${arrowSize} / 2)` : null
  const arrowPos = `calc(${arrowSize} / 2 * -1)`

  return css({
    '[x-arrow]': {
      width: arrowSize,
      height: arrowSize,
      position: 'absolute',
      transform: 'rotate(45deg)',

      '&::before': {
        content: '',
        width: arrowSize,
        height: arrowSize,
        position: 'absolute',
        zIndex: -1
      }
    },

    '&[x-placement^="top"]': {
      marginBottom: popoverMargin,
      transformOrigin: 'bottom center'
    },

    '&[x-placement^="top"] [x-arrow]': {
      bottom: arrowPos,

      '&::before': {
        boxShadow: `2px 2px 2px 0 ${arrowShadowColor}`
      }
    },

    '&[x-placement^="bottom"]': {
      marginTop: popoverMargin,
      transformOrigin: 'top center'
    },

    '&[x-placement^="bottom"] [x-arrow]': {
      top: arrowPos,

      '&::before': {
        boxShadow: `-1px -1px 1px 0 ${arrowShadowColor}`
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: popoverMargin,
      transformOrigin: 'left center'
    },

    '&[x-placement^="right"] [x-arrow]': {
      left: arrowPos,

      '&::before': {
        boxShadow: `-1px 1px 1px 0 ${arrowShadowColor}`
      }
    },

    '&[x-placement^="left"]': {
      marginRight: popoverMargin,
      transformOrigin: 'right center'
    },

    '&[x-placement^="left"] [x-arrow]': {
      right: arrowPos,
      '&::before': {
        boxShadow: `1px -1px 1px 0 ${arrowShadowColor}`
      }
    }
  })
}

export default getPopperArrowStyle
