import Breadstick from 'breadstick'
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, ThemeProvider } from '../../lib/core'
import { baseProps } from '../../lib/config/props'
import { forwardProps } from '../../lib/utils'

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
    return (
      <Alert
        status={this.status}
        variant={this.variant}
        id={this.id}
        textAlign="left"
        boxShadow="lg"
        rounded="md"
        alignItems="start"
        fontFamily="body"
        m={2}
        pr={2}
        p={4}
        {...forwardProps(this.$props)}
      >
        <AlertIcon />
        <Box flex="1">
          {this.title && <AlertTitle>{this.title}</AlertTitle>}
          {this.description && <AlertDescription>{this.description}</AlertDescription>}
        </Box>
        {this.isClosable && (
          <CloseButton
            size="sm"
            onClick={this.onClose}
            position="absolute"
            right="4px"
            top="4px"
            color="currentColor"
          />
        )}
      </Alert>
    )
  }
}

/**
 * @description Toast initialization API
 * @param {Object} options
 * @property {Object} theme
 * @property {Object} icons
 */
function useToast ({ theme, icons }) {
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
        // (
        //   <ThemeProvider theme={theme}>{render({ onClose, id })}</ThemeProvider>
        // ),
        options
      )
    }

    /**
     * @todo Need to battletest breadstick to RELIABLY support JSX API and render function API globally.
     */
    breadstick.notify(({ h, onClose, id }) => {
      return h(ThemeProvider, {
        props: {
          icons,
          theme
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
      })])
    },
    options
    )
  }

  return notify
}

export default useToast
