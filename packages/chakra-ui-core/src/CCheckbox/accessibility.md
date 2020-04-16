# Checkbox | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for alert dialogs](https://www.w3.org/TR/wai-aria-practices-1.2/#checkbox) supported by Chakra UI for the `CCheckbox` component.

### Description
Chakra UI supports two types of checkbox widgets:
- **Dual-state**: The most common type of checkbox, it allows the user to toggle between two choices -- checked and not checked.
- **Tri-state (Indeterminate)**: This type of checkbox supports an additional third state known as partially checked.

#### Components
`@chakra-ui/vue` exports 1 checkbox related components:
- `CCheckbox`

### `CCheckbox` Keyboard Interaction
- [x] **`Space`**: When the checkbox has focus, pressing the Space key changes the state of the checkbox.


### `CCheckbox` WAI-ARIA compliance
Native HTML checkboxes are 100% accessible by default, so we use a `CControlBox` component to control how the checkbox appears visually.

The `CCheckbox` component composes `CControlBox`, a component we created to make it easy to style an element based on sibling inputs.


Noticed a bug or inconsitency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)