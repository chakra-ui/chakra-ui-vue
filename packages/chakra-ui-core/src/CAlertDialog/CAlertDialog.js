/**
 * Hey! Welcome to @chakra-ui/vue AlertDialog
 *
 * AlertDialog component is used interrupt the user with
 * a mandatory confirmation or action.
 *
 * An alert dialog is a modal dialog that interrupts the user's
 * workflow to communicate an important message and acquire a response.
 * Examples include action confirmation prompts and error message confirmations.
 * The `alertdialog` role enables assistive technologies and browsers to
 * distinguish alert dialogs from other dialogs so they have the option
 * of giving alert dialogs special treatment, such as playing a system alert sound.
 *
 * @see Docs     https://vue.chakra-ui.com/alertdialog
 * @see Source   link to source
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAlertDialog/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#alertdialog
 */



import baseProps from '../config/props'
import { forwardProps, HTMLElement } from '../utils'

import {
  CModal,
  CModalContent,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModalOverlay,
  CModalCloseButton
} from '../CModal'

const formatIds = id => ({
  content: `alert-dialog-${id}`,
  header: `alert-dialog-${id}-label`,
  body: `alert-dialog-${id}-desc`
})

const CAlertDialog = {
  name: 'CAlertDialog',
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
  render (h) {
    return h(CModal, {
      props: {
        isOpen: this.isOpen,
        onClose: this.onClose,
        initialFocusRef: this.leastDestructiveRef,
        formatIds,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const CAlertDialogContent = {
  name: 'CAlertDialogContent',
  props: baseProps,
  render (h) {
    return h(CModalContent, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'alertdialog'
      }
    }, this.$slots.default)
  }
}

export {
  CAlertDialog,
  CAlertDialogContent,
  CModalOverlay as CAlertDialogOverlay,
  CModalBody as CAlertDialogBody,
  CModalHeader as CAlertDialogHeader,
  CModalFooter as CAlertDialogFooter,
  CModalCloseButton as CAlertDialogCloseButton
}
