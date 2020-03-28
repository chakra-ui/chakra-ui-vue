import Breadstick from 'breadstick'
import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription } from '../Alert'
import Box from '../Box'
import CloseButton from '../CloseButton'
import ThemeProvider from '../ThemeProvider'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import ColorModeProvider from '../ColorModeProvider'
import { colorModeObserver } from '../utils/color-mode-observer'

// Create breadstick instance.
const breadstick = new Breadstick()

/**
 * Toast component
 */
const Toast = {
  name: 'Toast',
  props: {
    status: {
      type: String,
      default: 'info'
    },
    variant: {
      type: String,
      default: 'solid'
    },
    id: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },
    isClosable: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: () => null
    },
    description: {
      type: String,
      default: ''
    },
    ...baseProps
  },
  render (h) {
    return h(CAlert, {
      props: {
        status: this.status,
        variant: this.variant,
        textAlign: 'left',
        boxShadow: 'lg',
        rounded: 'md',
        alignItems: 'start',
        fontFamily: 'body',
        m: 2,
        pr: 2,
        p: 4,
        ...forwardProps(this.$props)
      },
      attrs: {
        id: this.id
      }
    }, [
      h(CAlertIcon),
      h(Box, {
        props: {
          flex: '1'
        }
      }, [
        this.title && h(CAlertTitle, {}, this.title),
        this.description && h(CAlertDescription, {}, this.description)
      ]),
      this.isClosable && h(CloseButton, {
        props: {
          size: 'sm',
          position: 'absolute',
          right: '4px',
          top: '4px',
          color: 'currentColor'
        },
        on: {
          click: this.onClose
        }
      })
    ])
  }
}

/**
 * @description Toast initialization API
 * TODO: In Vue 3 this should be exposed as a hook of it's own so as to
 * to inject theme and icons variables provided by theme provider component.
 */
function useToast () {
  const { theme } = colorModeObserver
  /**
   * @description Notify Method for Kiwi
   * @param {Object} options
   * @property {String} position
   * @property {Number} duration
   * @property {Function} render
   * @property {String} title
   * @property {String} description
   * @property {String} status
   * @property {String} variant
   * @property {Boolean} isClosable
   */
  function notify ({
    position = 'bottom',
    duration = 5000,
    render,
    title,
    description,
    status,
    variant = 'solid',
    isClosable
  }) {
    const options = {
      position,
      duration
    }

    if (render) {
      return breadstick.notify(
        ({ h, onClose, id }) => {
          return h(ThemeProvider, {
            props: {
              theme
            }
          }, [render({ onClose, id })])
        },
        options
      )
    }

    /**
     * @todo Need to battletest breadstick to RELIABLY support JSX API and render function API globally.
     */
    breadstick.notify(({ h, onClose, id }) => {
      const { theme, colorMode, icons } = colorModeObserver
      return h(ThemeProvider, {
        props: {
          icons,
          theme
        }
      }, [h(ColorModeProvider, {
        props: {
          value: colorMode || 'light'
        }
      }, [h(Toast, {
        props: {
          status,
          variant,
          id: `${id}`,
          title,
          isClosable,
          onClose,
          description
        }
      })])])
    },
    options
    )
  }

  return notify
}

export default useToast
