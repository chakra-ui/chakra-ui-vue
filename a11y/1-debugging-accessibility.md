# 🛍 #a11y debugging
  - Render in a web browser
  - Test controls with the keyboard
  - Use accessibility web extensions
  - Check color contrast
  - Test with screen readers
  - Use magnification & zoom


# 🌮 Focus Management
This involves moving the user’s focus as part of an interaction
to alert them to new content. It also involves handling focus in disabled and mutated parts of the page.

### 1. `tabindex` in HTML
This is used to make non-interactive elements focusable.
```js
tabIndex="0"        // in the tab order. see following slides
tabIndex="-1"       // focusable by script, or removes from tab order
tabIndex="99641"    // all up in your tab order. hard to manage
```

### 2. Exposing accessibility information to focusable elements
Exposing accessibility information for elements in the DOM that are focusable requires the use of `tabindex`, `role` and `aria-label` attributes on the element.
```html
<div
  tabindex="0"
  role="button"
  aria-label="Close">   
</div>
```
#### Making custom elements fully interactive
To make focusable custom elements fully interactive, we need to use
`tabindex`, `role`, `aria-label` and Basic event management. This is an example of a button implemented using a `<div>` element.

```jsx
<div 
  tabIndex="0"
  role="button"
  aria-label="Close"
  onClick={clickHandler}
  onKeyDown={keydownHandler}>   
</div>
```
Alternatively you could just use a native `<button>` element since it manages this for you under the hood :)
```jsx
<button 
  aria-label="Close"
  onClick={clickHandler}>   
</button>
```

