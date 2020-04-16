# Circular Progress | Accessibility ♿️

This report is adapted to list the accessiblity features supported by Chakra UI for the `CCircularProgress` component.

### Description
The Circular Progress component is used to indicates the progress for both determinate and indeterminate processes.
- Determinate progress fills the circular track with color, as the indicator moves from 0 to 360 degrees.
- Indeterminate progress grow and shrink the indicator while moving along the circular track.

#### Components
`@chakra-ui/vue` exports 2 Circular Progress related components:
- `CCircularProgress`
- `CCircularProgressLabel`

### `CCircularProgress` WAI-ARIA compliance
- `CCircularProgress` has a role set to progressbar to denote that it's a progress bar.
- `CCircularProgress` has aria-valuenow set to the percentage completion value passed to the component, to ensure the progress percent is visible to screen readers.

Noticed a bug or inconsitency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)