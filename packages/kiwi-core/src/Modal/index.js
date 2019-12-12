import { forwardProps, createUuid, getFocusables, wrapEvent } from '../utils'
import { baseProps } from '../config/props'
import props from './modal.props'
import { ref, reactive, createElement as h, watch, inject, onBeforeMount, provide, toRefs } from '@vue/composition-api'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6'
import { useColorMode } from '../ThemeProvider'

import canUseDOM from 'can-use-dom'
import { hideOthers } from 'aria-hidden'
import { FocusTrap } from 'focus-trap-vue'
import Box from '../Box'
import CloseButton from '../CloseButton'

const ModalContext = Symbol('ModalContext')

/**
 * @description This verison of the Modal component is built whilst utilizing the
 * Vue 3 composition API plugin. Because of this, it has a few things things that
 * are little different. Inside of Vue 3's composition API, DOM refs are treated as other
 * primitive variables are treated.
 * Therefore, as Props, The modal component may expect some refs to DOM nodes as props.
 *
 * Happy to discuss this if need be.
 * ALL REF VALUES SHOULD BE PASSED IN AS ALREADY UNWRAPPED VARIABLES.
 * For more about this please read Vue 3's new RFC on refs in the template.
 * @see https://vue-composition-api-rfc.netlify.com/api.html#ref
 *
 * MODAL TODOS
 * 1) Modal should open and close without v-if directive.
 * 2) Should focus on focusable nodes in modal content by default
 * 3) Enable body scroll lock conditionals
 * 4) Entry / Exit Transitions
 */

/**
  * Main Modal Root component
  */
const Modal = {
  name: 'Modal',
  props,
  setup (props, context) {
    // Maybe directly use inject syntax?
    // It could be risky as the library gets larger.
    // In which case it might be better to just use the useXXX util pattern.
    const uuid = createUuid(4)
    const contentRef = ref(null)

    // Initial props values
    const _id = props.id || uuid
    const contentId = props.formatIds(_id)['content']
    const headerId = props.formatIds(_id)['header']
    const bodyId = props.formatIds(_id)['body']

    // ARIA labels
    let addAriaLabelledby = false
    let addAriaDescribedby = false

    // Ref of the modal portal target node
    const mountRef = ref(
      canUseDOM
        ? document.getElementById(props.id) || document.createElement('div')
        : null
    )

    // Container in which modal portal target will be located
    const container = props.container || canUseDOM ? document.body : null

    // Methods
    /**
     * Escape key press event handler for modal
     * @param {Event} event Keyboard Event
     */
    const handler = event => {
      if (event.key === 'Escape' && props.closeOnEsc) {
        props.onClose(event, 'pressedEscape')
      }
    }

    if (typeof props.addAriaLabels === 'object') {
      addAriaLabelledby = props.addAriaLabels['header']
      addAriaDescribedby = props.addAriaLabels['body']
    }

    if (typeof props.addAriaLabels === 'boolean') {
      addAriaLabelledby = props.addAriaLabels
      addAriaDescribedby = props.addAriaLabels
    }

    // When modal is open we block body scroll.
    watch((onCleanup) => {
      const dialogNode = contentRef.value
      if (props.isOpen && props.blockScrollOnMount) {
        disableBodyScroll(dialogNode, {
          reserveScrollBarGap: props.preserveScrollBarGap
        })
      }

      // Re-enable body scroll when the modal component is unmounted
      onCleanup(() => enableBodyScroll(dialogNode))
    })

    // Keyboad event listener handlers
    watch((onCleanup) => {
      if (props.isOpen && !props.closeOnOverlayClick) {
        canUseDOM && document.addEventListener('keydown', handler)
      }

      onCleanup(() => {
        // Remove event listeners when modal is unmounted
        canUseDOM && document.removeEventListener('keydown', handler)
      })
    })

    // Before modal content is mounted we append it's wrapper to the DOM. Otherwise MountingPortal will not know where to place it's slot.
    onBeforeMount(() => {
      if (canUseDOM) {
        mountRef.value.id = 'chakra-portal'
        container.appendChild(mountRef.value)
      }
    })

    // Here we set the entire DOM as inert and "aria-hidden" when the modal is open
    watch((onCleanup) => {
      let undoAriaHidden = null
      let mountNode = mountRef
      if (props.isOpen && canUseDOM) {
        mountRef.value.id = 'chakra-portal'
        container.appendChild(mountRef.value)
        if (props.useInert) {
          undoAriaHidden = hideOthers(mountNode.value)
        }
      } else {
        if (props.useInert && undoAriaHidden != null) {
          undoAriaHidden()
        }
        if (mountNode.value.parentElement) {
          mountNode.value.parentElement.removeChild(mountNode.value)
        }
      }
    }, { immediate: true })

    const modalContext = reactive({
      isOpen: props.isOpen,
      initialFocusRef: props.initialFocusRef,
      onClose: props.onClose,
      blockScrollOnMount: props.blockScrollOnMount,
      closeOnEsc: props.closeOnEsc,
      closeOnOverlayClick: props.closeOnOverlayClick,
      returnFocusOnClose: props.returnFocusOnClose,
      contentRef,
      scrollBehavior: props.scrollBehavior,
      isCentered: props.isCentered,
      headerId,
      bodyId,
      contentId,
      size: props.size,
      addAriaLabelledby,
      addAriaDescribedby
    })

    // Provide modal context to compound children components
    provide(ModalContext, { ...toRefs(modalContext) })

    return () => {
      const children = context.slots.default()
      if (mountRef.value.id === '') return

      return h('MountingPortal', {
        props: {
          mountTo: `#${mountRef.value.id}`,
          append: true
        }
      }, [h(FocusTrap, {
        props: {
          returnFocusOnDeactivate: props.returnFocusOnClose && !props.finalFocusRef,
          // initialFocus: props.initialFocusRef,
          active: props.isOpen
        },
        on: {
          activate: () => {
            if (props.initialFocusRef) {
              if (props.initialFocusRef instanceof HTMLElement) {
                props.initialFocusRef.focus()
              } else if (props.initialFocusRef.$el) {
                props.initialFocusRef.$el.focus()
              } else if (typeof props.initialFocusRef === 'string') {
                canUseDOM && mountRef.value.querySelector(props.initialFocusRef).focus()
              }
            } else {
              if (contentRef.value) {
                console.log(context)
                let focusables = getFocusables(contentRef.value)
                if (focusables.length === 0) {
                  contentRef.value.focus()
                }
              }
            }
          },
          deactivate: () => {
            if (props.finalFocusRef && props.finalFocusRef instanceof HTMLElement) {
              props.finalFocusRef.focus()
            } else if (props.finalFocusRef && props.finalFocusRef.$el) {
              props.finalFocusRef.$el.focus()
            } else if (typeof props.finalFocusRef === 'string') {
              const finalFocusNode = document.querySelector(props.finalFocusRef)
              if (!finalFocusNode) console.warn(`[ChakraUI Modal]: Unable to locate final focus node "${props.finalFocusRef}".`)
              else canUseDOM && finalFocusNode.focus()
            }
          }
        }
      }, [h('div', {}, children)])])
    }
  }
}

/**
 * Modal Overlay
 */
const ModalOverlay = {
  name: 'ModalOverlay',
  props: {
    forwardRef: HTMLElement,
    ...baseProps
  },
  setup (props) {
    return () => {
      return h(Box, {
        props: {
          pos: 'fixed',
          bg: 'rgba(0,0,0,0.4)',
          left: '0',
          top: '0',
          w: '100vw',
          h: '100vh',
          ref: props.forwardRef,
          zIndex: 'overlay',
          ...forwardProps(props)
        }
      })
    }
  }
}

const ModalContent = {
  name: 'ModalContent',
  props: {
    onClick: Function,
    noStyles: Boolean,
    forwardRef: HTMLElement,
    // Need to figure out why this prop is sometimes not resolved.
    // As a workaround I use the double pipe to default to 'modal' in the render function
    zIndex: {
      type: String,
      default: 'modal'
    },
    ...baseProps
  },
  setup (props, context) {
    // Should be reactive.
    // Please consider using toRefs if this doesn't go as planned.
    const {
      contentRef,
      onClose,
      isCentered,
      bodyId,
      headerId,
      contentId,
      size,
      closeOnEsc,
      addAriaLabelledby,
      addAriaDescribedby,
      scrollBehavior,
      closeOnOverlayClick
    } = inject(ModalContext)

    const colorMode = useColorMode()
    const _contentRef = ref(null)
    _contentRef.value = contentRef.value || props.forwardRef
    const colorModeStyles = {
      light: {
        bg: 'white',
        shadow: '0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)'
      },
      dark: {
        bg: 'gray.700',
        shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
      }
    }

    const boxStyleProps = colorModeStyles[colorMode]
    let wrapperStyle = {}
    let contentStyle = {}

    if (isCentered.value) {
      wrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    } else {
      contentStyle = {
        top: '3.75rem',
        mx: 'auto'
      }
    }

    if (scrollBehavior.value === 'inside') {
      wrapperStyle = {
        ...wrapperStyle,
        maxHeight: 'calc(100vh - 7.5rem)',
        overflow: 'hidden',
        top: '3.75rem'
      }

      contentStyle = {
        ...contentStyle,
        height: '100%',
        top: 0
      }
    }

    if (scrollBehavior.value === 'outside') {
      wrapperStyle = {
        ...wrapperStyle,
        overflowY: 'auto',
        overflowX: 'hidden'
      }

      contentStyle = {
        ...contentStyle,
        my: '3.75rem',
        top: 0
      }
    }

    if (props.noStyles) {
      wrapperStyle = {}
      contentStyle = {}
    }
    return () => {
      return h(Box, {
        props: {
          pos: 'fixed',
          left: '0',
          top: '0',
          w: '100%',
          h: '100%',
          zIndex: props.zIndex || 'modal',
          ...wrapperStyle,
          ...forwardProps(props)
        },
        on: {
          click: (event) => {
            event.stopPropagation()
            if (closeOnOverlayClick.value) {
              onClose.value(event, 'clickedOverlay')
            }
          },
          keydown: (event) => {
            if (event.key === 'Escape') {
              event.stopPropagation()
              if (closeOnEsc.value) {
                onClose.value(event, 'pressedEscape')
              }
            }
          }
        }
      }, [h(Box, {
        props: {
          as: 'section',
          outline: 0,
          maxWidth: size.value,
          w: '100%',
          pos: 'relative',
          d: 'flex',
          flexDir: 'column',
          zIndex: props.zIndex,
          ...boxStyleProps,
          ...contentStyle,
          ...forwardProps(props)
        },
        attrs: {
          'aria-modal': 'true',
          tabIndex: -1,
          id: contentId.value,
          ...(addAriaDescribedby.value && { 'aria-describedby': bodyId.value }),
          ...(addAriaLabelledby.value && { 'aria-labelledby': headerId.value })
        },
        on: {
          click: wrapEvent(props.onClick, event => event.stopPropagation())
        },
        ref: _contentRef.value
      }, context.slots.default())])
    }
  }
}

/**
 * Header Component for modal
 */
const ModalHeader = {
  name: 'ModalHeader',
  props: {
    forwardRef: {
      type: HTMLElement,
      default: null
    },
    ...baseProps
  },
  setup (props, context) {
    const { headerId } = inject(ModalContext)

    return () => {
      return h(Box, {
        props: {
          px: 6,
          py: 4,
          position: 'relative',
          fontSize: 'xl',
          fontWeight: 'semibold',
          ...forwardProps(props)
        },
        attrs: {
          id: headerId.value
        },
        ref: props.forwardRef
      }, [context.slots.default()])
    }
  }
}

/**
 * Footer Component for modal
 */
const ModalFooter = {
  name: 'ModalFooter',
  props: {
    ...baseProps,
    forwardRef: {
      type: HTMLElement,
      default: null
    }
  },
  setup (props, context) {
    return () => {
      return h(Box, {
        props: {
          as: 'footer',
          display: 'flex',
          px: 6,
          py: 4,
          justifyContent: 'flex-end',
          ...forwardProps(props)
        },
        ref: props.forwardRef
      }, context.slots.default())
    }
  }
}

/**
 * Modal Body Component for modal
 */
const ModalBody = {
  name: 'ModalBody',
  props: {
    ...baseProps,
    forwardRef: {
      type: HTMLElement,
      default: null
    }
  },
  setup (props, context) {
    const { bodyId, scrollBehavior } = inject(ModalContext)

    let style = {}
    if (scrollBehavior.value === 'inside') {
      style = { overflowY: 'auto' }
    }

    return () => {
      return h(Box, {
        props: {
          px: 6,
          py: 2,
          flex: 1,
          ...style,
          ...forwardProps(props)
        },
        attrs: {
          id: bodyId.value
        },
        ref: props.forwardRef
      }, context.slots.default())
    }
  }
}

/**
 * Close Button for Modal
 */
const ModalCloseButton = {
  name: 'ModalCloseButton',
  props: {
    ...baseProps,
    forwardRef: {
      type: HTMLElement,
      default: null
    }
  },
  setup (props, context) {
    const { onClose } = inject(ModalContext)
    return () => {
      return h(CloseButton, {
        props: {
          position: 'absolute',
          top: '8px',
          right: '12px',
          ...forwardProps(props)
        },
        on: {
          click: wrapEvent(onClose.value, event => context.emit('click', event))
        },
        ref: props.forwardRef
      })
    }
  }
}

// Modal Exports
export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
}
