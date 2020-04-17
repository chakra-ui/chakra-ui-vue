# Alert | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for Alerts](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion) supported by Chakra UI for the `CAlert` component.

### Description
An alert is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Dynamically rendered alerts are automatically announced by most screen readers, and in some operating systems, they may trigger an alert sound. It is important to note that, at this time, screen readers do not inform users of alerts that are present on the page before page load completes.

#### Components
`@chakra-ui/vue` exports 4 Alert related components:
- `CAlert`
- `CAlertIcon`
- `CAlertTitle`
- `CAlertDescription`

### `CAlert` Keyboard Interaction
Not applicable. This is because the `CAlert` component should not interfere with the users ability
to continue working. Therefore, displaying the alert does not affect keyboard focus.

### `CAlert` WAI-ARIA Roles, States, and Properties:
- [x] The `CAlert` component has a `role` of `alert`.

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)