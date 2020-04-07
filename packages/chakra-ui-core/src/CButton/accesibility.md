# Button | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for alert dialogs](https://www.w3.org/TR/wai-aria-practices-1.2/#button) supported by Chakra UI for the `CButton` component.

### Description
A button is a widget that enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation. 

#### Components
`@chakra-ui/vue` exports 2 Button related components:
- `CButton`
- `CButtonGroup`

### `CButton` Keyboard Interaction
- [x] **`Space`**: Activates the button.
- [x] **`Enter`**: Activates the button.


### `CButton` WAI-ARIA Roles, States, and Properties:

> The following should be implemented by the user  based on their needs.

- The `CButton` should have an accessible label. By default, the accessible name is computed from any text content inside the `CButton` element. However, it can also be provided with `aria-labelledby` or `aria-label`.
- If a description of the button's function is present, the `CButton` should have `aria-describedby` attribute set to the ID of the element containing the description.
- If the action associated with `CButton` is unavailable, the button should have `aria-disabled` set to true. (This can also be set by passing the `is-disabled` Boolean prop to `true` on the `CButton` component.)
- If `CButton` is a toggle button, it should have an `aria-pressed` state attribute. When the `CButton` is toggled on, the value of `aria-pressed` should be `true`, and when toggled off, `aria-pressed` should be `false`.

Noticed a bug or inconsitency with the component you just consumed? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)