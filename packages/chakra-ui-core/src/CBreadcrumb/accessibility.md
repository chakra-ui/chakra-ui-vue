# Breadcrumb | Accessibility ♿️

This report is adapted to list the [WAI-ARIA Authoring practices for alert dialogs](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb) supported by Chakra UI for the `CBreadcrumb` component.

### Description
A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.

#### Components
`@chakra-ui/vue` exports 4 Breadcrumb related components:
- `CBreadcrumbSeparator`
- `CBreadcrumbLink`
- `CBreadcrumbItem`
- `CBreadcrumb`

### `CBreadcrumb` Keyboard Interaction
- Not applicable


### `CBreadcrumb` WAI-ARIA Roles, States, and Properties:
- [x] `CBreadcrumb` trail is contained within a navigation landmark region.
- [x] The `CBreadcrumb` The landmark region is labelled via `aria-label`.
- [x] The link to the current page has `aria-current` set to page. If the element representing the current page is not a link, `aria-current` is optional. This is determined by setting the `isCurrentPage` boolean prop to the `CBreadcrumbLink` component

Noticed a bug or inconsitency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)