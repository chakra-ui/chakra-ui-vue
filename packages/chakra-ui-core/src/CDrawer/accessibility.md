# Drawer | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal) supported by Chakra UI for the `CDrawer` component.

The `CDrawer` component composes the [`CModal`](https://vue.chakra-ui.com/modal) component, so it also inherits the Modal accessibility patterns.

### Description
The Drawer component is a panel that slides out from the edge of the screen. It can be useful when you need users to complete a task or view some details without leaving the current page.

#### Components
`@chakra-ui/vue` exports 7 Drawer related components:
- `CDrawer`
- `CDrawerContent`
- `CDrawerOverlay`
- `CDrawerCloseButton`
- `CDrawerBody`
- `CDrawerHeader`
- `CDrawerFooter`


### `CAlert` Keyboard Interaction
- **`Tab`**:
  - Moves focus to the next tabbable element inside the `CDrawer`.
    If focus is on the last tabbable element inside the `CDrawer`, moves focus to the first tabbable element inside the `CDrawer` component.
- **`Shift + Tab`**:
  - Moves focus to the previous tabbable element inside the `CDrawer`.
If focus is on the first tabbable element inside the `CDrawer`, moves focus to the last tabbable element inside the `CDrawer` component.
Escape: Closes the drawer.

### Focus Management
- When a drawer opens, focus moves to an element inside the dialog. 
- By default focus for the `CDrawer` will be sent to the first focusable element when the `CDrawer` opens.
- When a drawer closes, focus returns to the element that invoked the drawer


### `CDrawer` WAI-ARIA Roles, States, and Properties:
- [x] Chakra's alert dialog container element has the `role` of `dialog`. The component that provides this is the `CDrawerContent`.
- [x] The `CDrawerContent` element has the `aria-labelledby` attribute whose value is the id of the `CDrawerHeader`. This id is auto generated and assigned out of the box. However, it can also be customized by the consumer. In order to keep the `CDrawer` accessible, always provide the `CDrawerHeader` component inside the `CDrawerContent` component.

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)