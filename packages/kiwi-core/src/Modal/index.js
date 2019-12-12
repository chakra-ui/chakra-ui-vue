// import { forwardProps, cloneVNode } from '../utils'
import props from './modal.props'
import { ref, reactive, createElement as h, watch, onBeforeMount, provide } from '@vue/composition-api'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6'
// import { useTheme, useColorMode } from '../ThemeProvider'
import { createUuid, getFocusables } from '../utils'
import canUseDOM from 'can-use-dom'
import { hideOthers } from 'aria-hidden'
// import Portal from '../Portal'
import { FocusTrap } from 'focus-trap-vue'

const ModalContext = Symbol('ModalContext')

/**
 * @description This verison of the Modal component is built whilst utilizing the
 * Vue 3 composition API plugin. Because of this, it has a few things things that
 * are little different. Inside of Vue 3's composition API, DOM refs are treated as other
 * primitive variables are treated.
 * Therefore, as Props, The modal component may expect some refs to DOM nodes as props.
 *
 * THESE VALUES SHOULD BE PASSED IN AS ALREADY UNWRAPPED VARIABLES.
 * This means that the modal will not access the ref value with the `.value` syntax
 * when it is received. All DOM refs passed in to the Modal component need to be instances
 * of `HTMLElement` and not wrapped values.
 *
 * Because of this the modal will focus them as follows:
 * Notice that the ref is not unwrapped before calling `.focus
 * ```js
 * props.initialFocusRef.focus()`
 * ```
 * Instead of:
 * ```js
 * props.initialFocusRef.value.focus()`
 * ```
 * Notice that this ref is still wrapped.
 *
 * This will allow us to handle internally created refs as wrapped values for reactivity
 * and treats incoming refs as pure DOM nodes. A fairly good standard/compromise.
 *
 * Happy to discuss this if need be.
 *
 * For more about this please read Vue 3's new RFC on refs in the template.
 * @see https://vue-composition-api-rfc.netlify.com/api.html#ref
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

    // Before modal is mounted we append it to the DOM. Otherwise MountingPortal will not know where to place it's slot.
    onBeforeMount(() => {
      if (props.isOpen && canUseDOM) {
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
      }

      onCleanup(() => {
        if (props.useInert && undoAriaHidden != null) {
          undoAriaHidden()
        }
        if (mountNode.value.parentElement) {
          mountNode.value.parentElement.removeChild(mountNode.value)
        }
      })
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
    provide(ModalContext, modalContext)
    if (!props.isOpen) {
      return null
    }

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
          initialFocus: props.initialFocusRef,
          active: props.isOpen
        },
        on: {
          activate: () => {
            if (props.initialFocusRef && props.initialFocusRef instanceof HTMLElement) {
              props.initialFocusRef.focus()
            } else {
              if (contentRef.value) {
                let focusables = getFocusables(contentRef.value)
                if (focusables.length === 0) {
                  contentRef.value.focus()
                }
              }
            }
          },
          deactivate: () => {
            if (props.finalFocusRef && props.finalFocusRef instanceof HTMLElement) {
              props.finalFocusRef.current.focus()
            }
          }
        }
      }, children)])
    }
  }
}

// Modal Exports
export {
  Modal
}
