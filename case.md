# 🌮 Tag prop use case

I'm currently working on building a Vue UI components library  called Kiwi based on vue-styled-components. Even though I've not been developing for a very long time, I'm still very open to learning. So please feel free to helping me improve my understading of Styled Components.

### 📦 Types of components

In the Kiwi component library that I am working on, I planned to create my components under two main categories. I have **Abstract** and **Composed** components. The Composed components are to be composed from the abstract components. An example of an abstract component would be the `<Box>`, `<PseudoBox>` components. These in the real world can represent the `<div>, <header>, <section>, <nav>, <button> etc`. elements.

An example of composed components would include my library's `Button` and `Modal` components, for example. The idea is to compose these components from the abstract components. This would make it easier to create these library components from a base reusable component and still allow for flexibility for a user. If a user would like to create a make the `Button` element render an anchor tag they could just adjust the `tag` prop on the `<Button tag="TAG" />` node in the template.

With this kind of composability in mind, the first two components I made were the `Box` and `PseudoBox` components. These two components were to serve the as the building blocks for all other components.

The `Box` component is to be the wrapper for all possible style props and render a `<div>` element by default. The `PseudoBox` is to be a wrapper for all the pseudo style props. This includes `&:hover`, `&:focus`, `&:before`, etc. states. `PseudoBox` renders the `Box` at definition.

Below is an example of my use case:

**Box.js**
```js
import system from '@styled-system'
import baseProps from '@/lib/utils/'

/**
 * Define the Box component. Render 'div' by default.
 * */
const Box = styled('div', {
  ...baseProps
})`
  ${props => {
    const sanitizedProps = cleanProps(props)
    return system(sanitizedProps)
  }}
`
export default Box
```

**PseudoBox.js**
```js
import css from '@styled-system/css'
import { Box } from '../../lib/core/'
import { pseudoProps } from '../../lib/config/props'
import { parsePseudoStyles } from './utils'

/**
 * Define PseudoBox component to provide pseudo styles for 
 * `_focus`, `_hover`, `_active`, etc. and `aria-*` attributes.
 * Renders the Box component.
 */
const PseudoBox = styled(Box, {
  ...pseudoProps
})`
  ${(props) => {
    const styles = parsePseudoStyles(props)
    return css(styles)
  }}
`
export default PseudoBox
```
This allows me to do bind pseudo state styles as props while maintaining the base props inherited from the Box component.

### 📚 The challenge with `withComponent` API?
Components created using the `withComponent` API presently do not inherit props from the "grandparent" styled component. i.e. If the parent component(`PseudoBox`) is composed from another styled component(`PseudoBox`), the resulting component(`Button`) will not inherit style props from the grandparent component(`Box`).

```js
// Create Box and bind style props
const Box = styled('div' ...props)

// Create PseudoBox from Box and bind pseudo style props
const PseudoBox = styled(Box, ...props)

// In this case, `Button` will only "inherit" style props defined on the `PseudoBox` component but not those style props that `PseudoBox` inherits from `Box`.
const Button = PseudoBox.withComponent('button')
```

### 💐 Why `tag="TAGNAME"` prop is useful.
This would allow me to extend the styles of the declared component internally all while setting the tag type. This will allow for better composability for higher level components like buttons, menus, etc.

This would allow me to make use of the `PseudoBox` component when creating a new `Button` component that extends the props of `PseudoBox`.

```html
<template>
  <PseudoBox
    tag="button"
    role="button"
    bg="blue.400"
    :_focus="{
      bg: 'blue.500',
      border: '2px'
    }"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
  >
    Button Text
  </PseudoBox>
</template>
```

### For UserLand
The tag attribute below allows the userland devs to modify the tag while inheriting it's props from the `PseudoBox` and `Box` components. I would love for myself to be able to manipulate the tag attribute to a desired element to customize the `Box` and `PseudoBox` for my desired need. E.g. Render a `Box` as a `header` or `main` which are more accessible without having to modify the script as shown below.

```html
<template>
  <Box
    tag="header"
    bg="gray.100"
    px="8"
    py="6"
    font-family="heading"
    d="flex"
  >
    <Box>
      <Text
        tag="h1"
        color="primary"
      >
        My awesome site heading
      </Text>
    <Box>
    <Text
      tag="h2"
      font-weight="thin"
      color="secondary"
    >
      My site's description
    <Text>
  </Box>
</template>

```

### 🥜 In a nut shell
`Box | default <div>`
  - `PseudoBox | "Inherits" props from Box`
    - This `PseudoBox` component can be rendered with a different element via a `tag` attribute.