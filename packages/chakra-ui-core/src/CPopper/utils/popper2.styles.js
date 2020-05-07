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
    display: 'none',
    
    '[data-show]': {
      display: 'block'
    },

    '[data-popper-arrow]': {
      width: arrowSize,
      height: arrowSize,
      position: 'absolute',
      backgroundColor: 'inherit',
      zIndex: -1,

      '&::before': {
        content: '""',
        width: arrowSize,
        height: arrowSize,
        position: 'absolute',
        // transform: 'rotate(45deg)',
        backgroundColor: 'inherit',
        zIndex: -1
      }
    },

    '&[data-popper-placement^="top"]': {
      marginBottom: popoverMargin,
      transformOrigin: 'bottom center'
    },

    '&[data-popper-placement^="top"] [data-popper-arrow]': {
      bottom: arrowPos,

      '&::before': {
        boxShadow: `2px 2px 2px 0 ${arrowShadowColor}`
      }
    },

    '&[data-popper-placement^="bottom"]': {
      marginTop: popoverMargin,
      transformOrigin: 'top center'
    },

    '&[data-popper-placement^="bottom"] [data-popper-arrow]': {
      top: arrowPos,

      '&::before': {
        boxShadow: `-1px -1px 1px 0 ${arrowShadowColor}`
      }
    },

    '&[data-popper-placement^="right"]': {
      marginLeft: popoverMargin,
      transformOrigin: 'left center'
    },

    '&[data-popper-placement^="right"] [data-popper-arrow]': {
      left: arrowPos,

      '&::before': {
        boxShadow: `-1px 1px 1px 0 ${arrowShadowColor}`
      }
    },

    '&[data-popper-placement^="left"]': {
      marginRight: popoverMargin,
      transformOrigin: 'right center'
    },

    '&[data-popper-placement^="left"] [data-popper-arrow]': {
      right: arrowPos,
      '&::before': {
        boxShadow: `1px -1px 1px 0 ${arrowShadowColor}`
      }
    }
  })
}

export default getPopperArrowStyle
