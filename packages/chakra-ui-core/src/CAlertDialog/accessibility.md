# AlertDialog | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for alert dialogs](https://www.w3.org/TR/wai-aria-practices-1.2/#alertdialog) supported by Chakra UI for the `CAlertDialog` component.

### Description
An alert dialog is a modal dialog that interrupts the user's workflow to communicate an important message and acquire a response. Examples include action confirmation prompts and error message confirmations. The `alertdialog` role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

#### Components
`@chakra-ui/vue` exports 7 AlertDialog related components:
- `CAlertDialog`
- `CAlertDialogContent`
- `CAlertDialogOverlay`
- `CAlertDialogBody`
- `CAlertDialogHeader`
- `CAlertDialogFooter`
- `CAlertDialogCloseButton`

### `CAlert` Keyboard Interaction
- **`Tab`**:
  - Moves focus to the next tabbable element inside the `CAlertDialog`.
    If focus is on the last tabbable element inside the `CAlertDialog`, moves focus to the first tabbable element inside the `CAlertDialog` component.
- **`Shift + Tab`**:
  - Moves focus to the previous tabbable element inside the `CAlertDialog`.
If focus is on the first tabbable element inside the `CAlertDialog`, moves focus to the last tabbable element inside the `CAlertDialog` component.
Escape: Closes the dialog.

### Focus Management
- When a dialog opens, focus moves to an element inside the dialog. 
- By default focus for the `CAlertDialog` will be sent to the first focusable element when the `CAlertDialog` opens.
- When a dialog closes, focus returns to the element that invoked the dialog


### `CAlertDialog` WAI-ARIA Roles, States, and Properties:
- [x] Chakra's alert dialog container element has the `role` of `alertdialog`. The component that provides this is teh `CAlertDialogContent`.
- [x] The `CAlertDialogContent` element has the `aria-labelledby` attribute whose value is the id of the `CAlertDialogHeader`. This id is auto generated and assigned out of the box. However, it can also be customized by the consumer. In order to keep the `CAlertDialog` accessible, always provide the `CAlertDialogHeader` component inside the `CAlertDialogContent` component.

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)