import props from './modal.props'
import { useId, canUseDOM, getElById, isVueComponent, getElement, getFocusables, cleanChildren } from '../utils'
import Portal from '../Portal'
import PseudoBox from '../PseudoBox'
import { hideOthers } from 'aria-hidden'
import { FocusTrap } from 'focus-trap-vue'

const Modal = {
  name: 'Modal',
  props,
  data () {
    return {
      addAriaLabelledby: false,
      addAriaDescribedby: false,
      modalNode: undefined,
      contentNode: undefined
    }
  },
  provide () {
    return {
      $ModalContext: () => this.ModalContext
    }
  },
  computed: {
    _id () {
      return this.id || useId(4)
    },
    contentId () {
      return this.formatIds(this._id)['content']
    },
    headerId () {
      return this.formatIds(this._id)['header']
    },
    bodyId () {
      return this.formatIds(this._id)['body']
    },
    modalId () {
      return `modal-${this._id}`
    },
    portalTarget () {
      return `#modal-portal-${this._id}`
    },
    ModalContext () {
      return {
        isOpen: this.isOpen,
        initialFocusRef: this.initialFocusRef,
        onClose: this.onClose,
        blockScrollOnMount: this.blockScrollOnMount,
        closeOnEsc: this.closeOnEsc,
        closeOnOverlayClick: this.closeOnOverlayClick,
        returnFocusOnClose: this.returnFocusOnClose,
        contentNode: this.contentNode,
        scrollBehavior: this.scrollBehavior,
        isCentered: this.isCentered,
        size: this.size,
        headerId: this.headerId,
        bodyId: this.bodyId,
        contentId: this.contentId,
        addAriaLabelledby: this.addAriaLabelledby,
        addAriaDescribedby: this.addAriaDescribedby
      }
    }
  },
  mounted () {
    if (typeof this.addAriaLabels === 'object') {
      this.addAriaLabelledby = this.addAriaLabels['header']
      this.addAriaDescribedby = this.addAriaLabels['body']
    }

    if (typeof addAriaLabels === 'boolean') {
      this.addAriaLabelledby = this.addAriaLabels
      this.addAriaDescribedby = this.addAriaLabels
    }

    this.$nextTick(() => {
      this.modalNode = getElById(this.modalId)
    })

    /**
     * Escape key press event handler for modal
     * @param {Event} event Keyboard Event
     */
    const handler = event => {
      if (event.key === 'Escape' && props.closeOnEsc) {
        props.onClose(event, 'pressedEscape')
      }
    }

    this.$watch(vm => [vm.isOpen, vm.blockScrollOnMount], () => {
      if (this.isOpen && !this.closeOnOverlayClick) {
        canUseDOM && document.addEventListener('keydown', handler)
      } else {
        document.addEventListener('keydown', handler)
      }
    })

    let undoAriaHidden = null
    this.$watch(vm => [vm.isOpen, vm.useInert], () => {
      let mountNode = this.mountNode
      if (this.isOpen && canUseDOM) {
        if (this.useInert) {
          undoAriaHidden = hideOthers(mountNode)
        }
        this.contentNode = getElById(this.contentId)
      } else {
        if (this.useInert && undoAriaHidden != null) {
          undoAriaHidden()
        }
      }
    })
  },
  methods: {
    /**
     * Handles focus trap activation
     */
    activateFocusLock () {
      setTimeout(() => {
        if (this.initialFocusRef) {
          const initialFocusRef = this.getNode(this.initialFocusRef)
          if (initialFocusRef) {
            initialFocusRef.focus()
          }
        } else {
          if (this.contentNode) {
            let focusables = getFocusables(this.contentNode)
            if (focusables.length === 0) {
              this.contentNode.focus()
            } else {
              const [el] = focusables
              el instanceof HTMLElement && el.focus()
            }
          }
        }
      })
    },

    /**
     * Handles focus trap deactivation
     */
    deactivateFocusLock () {
      setTimeout(() => {
        if (this.finalFocusRef) {
          const finalFocusRef = this.getNode(this.finalFocusRef)
          if (finalFocusRef) {
            canUseDOM && finalFocusRef.focus()
          } else {
            console.warn(`[ChakraUI Modal]: Unable to locate final focus node "${props.finalFocusRef}".`)
          }
        }
      })
    },

    /**
     * Gets the HTML element for a component or selector
     * @param {Object|String} element Element or selector
     */
    getNode (element) {
      if (typeof element === 'object') {
        const isVue = isVueComponent(element)
        return isVue ? element.$el : element
      } else if (typeof element === 'string') {
        return getElement(element)
      }
      return null
    }
  },
  render (h) {
    const children = cleanChildren(this.$slots.default)

    return h(Portal, {
      props: {
        append: true,
        target: this.portalTarget,
        disabled: false,
        slim: true,
        unmountOnDestroy: true,
        targetSlim: true
      }
    }, [
      h(FocusTrap, {
        props: {
          returnFocusOnDeactivate: this.returnFocusOnClose && this.finalFocusRef,
          active: this.isOpen
        },
        on: {
          activate: this.activateFocusLock,
          deactivate: this.deactivateFocusLock
        }
      }, [h(PseudoBox, {
        attrs: {
          id: this.modalId
        },
        directives: [{
          name: 'scroll-lock',
          value: this.isOpen && this.blockScrollOnMount
        }]
      }, children)])
    ])
  }
}

export {
  Modal as MModal
}
