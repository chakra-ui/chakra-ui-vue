# Link | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for alert dialogs](https://www.w3.org/TR/wai-aria-practices-1.2/#link) supported by Chakra UI for the `CLink` component.

### Description
A link widget provides an interactive reference to a resource. The target resource can be either external or local, i.e., either outside or within the current page or application.

#### Components
`@chakra-ui/vue` exports 1 checkbox related components:
- `CLink`

### `CLink` Keyboard Interaction
- [x] **`Enter`**: Executes the link and moves focus to the link target.
- [x] **`Shift + F10 (Optional)`**: Opens a context menu for the link.


### `CLink` WAI-ARIA compliance
The element containing the link text or graphic has role of link.
Links are accessible elements used primarily for navigation. This component is styled to resemble a hyperlink and semantically renders an `<a>`.

The `CLink` component composes `CPseudoBox`, so you can pass all `CPseudoBox` props


Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)
