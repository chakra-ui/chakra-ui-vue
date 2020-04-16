# Tooltip | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for tooltips](https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip) supported by Chakra UI for the `CTooltip` component.

### Description
A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. It typically appears after a small delay and disappears when Escape is pressed or on mouse out.

Tooltip widgets do not receive focus. A hover that contains focusable elements can be made using a non-modal dialog.

#### Components
`@chakra-ui/vue` exports 1 Tooltip related component:
- `CTooltip`
  
>🚨NOTE: The WAI-ARIA design pattern for Tooltips is work in progress; it does not yet have task force consensus. Progress and discussions are captured in [issue 128](https://github.com/w3c/aria-practices/issues/128).

### `CTooltip` Keyboard Interaction
- Focus stays on the triggering element while the `CTooltip` is displayed.
- If `CTooltip` is invoked when the trigger element receives focus, then it is dismissed when it no longer has focus (or is blurred). If `CTooltip` is invoked with `mouseover`, then it is dismissed with on `mouseover`.

- **`Escape`**:
  - If the triggering element is focused and `CToolip` is displayed, when the `Escape` key is pressed, `CToolip` is dismissed.

### `CTooltip` WAI-ARIA Roles, States, and Properties:
- [x] The `CTooltip` element has `role` of `tooltip`.
- [x] The `CTooltip` triggering element (default slot element) has the `aria-labelledby` attribute whose value is the id of the `CTooltip`. This id is auto generated and assigned out of the box.

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)