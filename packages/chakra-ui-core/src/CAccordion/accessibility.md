# Accordion | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for Accordions](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion) supported by Chakra UI for the `CAccordion` component.

### Description
An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

#### Components
`@chakra-ui/vue` exports 5 Accordion related components:
- `CAccordion`
- `CAccordionItem`
- `CAccordionHeader`
- `CAccordionPanel`
- `CAccordionIcon`

### `CAccordion` Keyboard Interaction
**`Space`** or **`Enter`**
- [x] When focus is on the `CAccordionHeader` for a collapsed panel, expands the associated `CAccordionPanel`
- [x] When focus is on the `CAccordionHeader` for an expanded `CAccordionPanel`, collapses the panel if the implementation supports collapsing
- [x] **`Tab`**: Moves focus to the next focusable element. This includes all `CAccordionHeader` elements and other focusable elements that might exist inside the `CAccordionPanel`
- [x] **`Shift + Tab`**: Moves focus to the previous focusable element; all focusable elements in the `CAccordion` are included in the page `Tab` sequence

### `CAccordion` WAI-ARIA Roles, States, and Properties:
- [x] **The title of each accordion header is contained in an element with role button.**: `CAccordionHeader` wraps all of its content inside a `<button>` element.
- [x] **Each `CAccordionHeader` button is wrapped in an element with role heading**:  `CAccordionPanel` possesses an `aria-labelledby` attribute that references it's corresponding `CAccordionHeader`.
- [x] If the `CAccordionPanel` associated with an `CAccordionHeader` is visible, the `CAccordionHeader` button element has `aria-expanded` set to `true`. If the `CAccordionPanel` is not visible, `aria-expanded` is set to `false`.
- [x] The `CAccordionHeader` button element has `aria-controls` set to the id corresponding `CAccordionPanel`
- [x] If the `CAccordionPanel` associated with a given `CAccordionHeader` is visible, and if the accordion does not permit the panel to be collapsed, the `CAccordionHeader` button element has `aria-disabled` set to true.

Noticed a bug or inconsitency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)