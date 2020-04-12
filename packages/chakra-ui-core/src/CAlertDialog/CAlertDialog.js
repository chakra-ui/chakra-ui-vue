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
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAlertDialog/CAlertDialog.js
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

/**
 * CAlertDialog component
 *
 * The wrapper for alertdialog components. It provides context and state for the dialog.
 *
 * @extends CModal
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
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
      },
      attrs: {
        'data-chakra-component': 'CAlertDialog'
      }
    }, this.$slots.default)
  }
}

/**
 * CAlertDialogContent component
 *
 * The wrapper for the alert dialog's content.
 *
 * @extends CModalContent
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogContent = {
  name: 'CAlertDialogContent',
  props: baseProps,
  render (h) {
    return h(CModalContent, {
      props: {
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'alertdialog',
        'data-chakra-component': 'CAlertDialogContent'
      }
    }, this.$slots.default)
  }
}

/**
 * CAlertDialogOverlay component
 *
 * The dimmed overlay behind the dialog.
 *
 * @extends CModalOverlay
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogOverlay = CModalOverlay
CAlertDialogOverlay.name = 'CAlertDialogOverlay'
/**
 * CAlertDialogBody component
 *
 * Should contain the description announced by screen readers
 *
 * @extends CModalBody
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogBody = CModalBody
CAlertDialogBody.name = 'CAlertDialogBody'

/**
 * CAlertDialogHeader component
 *
 * Should contain the title announced by screen readers
 *
 * @extends CModalHeader
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogHeader = CModalHeader
CAlertDialogHeader.name = 'CAlertDialogHeader'

/**
 * CAlertDialogFooter component
 *
 * Should contain the actions of the dialog
 *
 * @extends CModalFooter
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogFooter = CModalFooter
CAlertDialogFooter.name = 'CAlertDialogFooter'

/**
 * CAlertDialogCloseButton component
 *
 * The button that closes the dialog.
 *
 * @extends CModalCloseButton
 * @see Docs https://vue.chakra-ui.com/alertdialog
 */
const CAlertDialogCloseButton = CModalCloseButton
CAlertDialogCloseButton.name = 'CAlertDialogCloseButton'

export {
  CAlertDialog,
  CAlertDialogContent,
  CAlertDialogOverlay,
  CAlertDialogBody,
  CAlertDialogHeader,
  CAlertDialogFooter,
  CAlertDialogCloseButton
}
