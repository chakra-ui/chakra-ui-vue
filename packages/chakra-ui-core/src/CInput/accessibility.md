# Input | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for form](https://www.w3.org/TR/wai-aria-practices-1.2/#aria_lh_form) supported by Chakra UI for the `CInput` component.

### Description
`CInput` component is a component that is used to get user input in a text field. It is usually used together with the FormControl to provide an accessible label, validation messages, etc.


#### Components
`@chakra-ui/vue` exports 1 Input related component:
- `CInput`

### `CInput` Keyboard Interaction
- In a single-line use (when aria-multiline is false or not used), the Return or Enter key submits the form. In a multi-line use (when aria-multiline is true), Return or Enter key inserts a line break.

### `CInput` WAI-ARIA Roles, States, and Properties:

> The following should be implemented by the user  based on their needs.

- The `CInput` should have an accessible label. It can be provided with `aria-labelledby` or `aria-label`. Accessibility label to use, in scenarios where the input has no  visible label. A11y: It's usefult for screen readers

- The `CInput` should have an accessible description. It can be provided with `aria-describedby`. Accessibility label to use, in scenarios where the input has no visible label. A11y: It's usefult for screen readers

- The `Cinput` should have an accessible readonly property. Where a text field is read-only, indicated this by setting `aria-readonly="true"` on the element.

It is a better practice to use an <input> element with type="text" instead of the ARIA textbox role. When using either semantic element, the ARIA textbox role is not necessary. 

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)