# Skip Nav | Accessibility ♿️

This report is adapted to the outline from the [WAI-ARIA Authoring Patterns practices](https://www.w3.org/WAI/ARIA/apg/patterns/) and technique information from [WebAIM](https://webaim.org/techniques/skipnav/), supported by Chakra UI for the `CSkipNav` components.

### Description

The Skip Navigation components are a tandem used to provide interaction for the keyboard user in skipping navigation content (or redundant content used at the top of multiple pages) to the main body of the page.

#### Components

`@chakra-ui/vue` exports 2 Skip Nav related components:

- `CSkipNavLink`
- `CSkipNavContent`

### `CSkipNav` Keyboard Interaction

- **`Tab`**:
  - On initial load of the page, moves focus to the `CSkipNavLink` element, provided that this component is the first focusable element in the page.
  - On focus of the `CSkipNavContent` component, moves to the next focusable element inside the wrapper.
- **`Enter`**:
  - Moves focus from the `CSkipNavLink` element to the `CSkipNavContent` element.

### `CDrawer` WAI-ARIA Roles, States, and Properties:

- The `CSkipNavLink` contains an href linking to the `id` of the `CSkipNavContent` component.
- The `CSkipNavContent` component renders `tabindex="-1"` to show visible change of focus to the main content. A screen reader is expected to immediately read out the first of this content.

### Consideration of Multiple `CSkipNavLinks` Components

In most cases, a single component is sufficient.

However, a very complex page with several repeated elements may neeeded additional skip links, either by providing the whole set at the very beginning of the page to navigate through, or added as in-page links to allow the user to quickly bypass content, including confusing or inaccessible content such as ASCII art, complex tables, or complex social media feeds.

Remember, the purpose of skip navigation links is to make keyboard navigation more efficient. Adding more links increases link-clutter. At what point will you need to add a "Skip the skip links" link?!

### Concerns with Aestheic Impact

The `CSkipNavLink` component is designed to be hidden until a user navigtes to it with a keyboard. The address concerns of the link being unattractive or confusing to users who do not need it.

Techniques like `display: none` or the `hidden` attribute will remove the component from keyboard interaction. Therefore, the component is styled in such a way that it positioned out of the visible browser window, and then on focus with CSS it transitions into view.

If there is concern with a user potentially tabbing quickly away from the component, it can be styled or scripted to remain visible for an extended period of time.

### `CLink` WAI-ARIA compliance

- [WCAG 2.4.1 (Bypass Blocks - Level A)](https://www.w3.org/TR/WCAG21/#bypass-blocks): This component tandem is a mechanism bypassing blocks of content that are repeated on multiple pages.
- The `CSkipNavLink` component renders an `<a>` element with rendered visibility as hidden off the screen. When tabbing to the link, it becomes visible for sighted keyboard users, and read out by a screen reader.
- With the `CSkipNavContent` component containing `tabindex="-1"`, the component renders a focus ring on focus for the visual keyboard user to indicate arrival to the main content.

Noticed a bug or inconsistency with this component? [Open an issue](https://github.com/chakra-ui/chakra-ui-vue/issues/new/choose)
