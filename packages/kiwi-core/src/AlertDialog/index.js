import { createElement as h, ref } from '@vue/composition-api'
import baseProps from '../config/props'
import { forwardProps } from '../utils'
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton
} from '../Modal'

const formatIds = id => ({
  content: `alert-dialog-${id}`,
  header: `alert-dialog-${id}-label`,
  body: `alert-dialog-${id}-desc`
})

const AlertDialog = {
  name: 'AlertDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => null
    },
    leastDestructiveRef: [HTMLElement, Object],
    ...baseProps
  },
  setup (props, context) {
    return () => {
      return h(Modal, {
        props: {
          isOpen: props.isOpen,
          onClose: props.onClose,
          initialFocusRef: props.leastDestructiveRef,
          formatIds,
          ...forwardProps(props)
        }
      }, context.slots.default())
    }
  }
}

const AlertDialogContent = {
  name: 'AlertDialogContent',
  props: baseProps,
  setup (props, context) {
    const innerRef = ref(null)
    return () => {
      return h(ModalContent, {
        props: {
          ...forwardProps(props)
        },
        attrs: {
          role: 'alertdialog'
        },
        ref: innerRef.value
      }, context.slots.default())
    }
  }
}

export {
  AlertDialog,
  AlertDialogContent,
  ModalOverlay as AlertDialogOverlay,
  ModalBody as AlertDialogBody,
  ModalHeader as AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
  ModalCloseButton as AlertDialogCloseButton
}
