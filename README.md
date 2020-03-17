
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui-vue">
    <img src="https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue-beta.png" alt="chakra-ui symbol" width="300" />
  </a>
</p>

<h2 align="center">Build scalable and accessible Vue.js applications with ease.</h2>

**chakra-ui-vue** gives you a set of accessible and composable Vue components that you can use to build your favourite applications and sites.

> Hello, friend! 😄
> **chakra-ui-vue** is currently under development. Majority of all the components ready and can be used!
> 
> A more detailed documentation site is in the pipeline and will be released soon! Check out our [storybook](https://chakra-ui-vue.netlify.com) and [Codesandbox Vue & Nuxt Starters](#codesandbox-starters).

## Features

- **Ease of Styling:** Chakra UI contains a set of layout components like `Box` and
  `Stack` that make it easy to style your components by passing props.
  [Learn more](https://chakra-ui.com/style-props)
- **Flexible & composable**: Chakra UI components are built on top of a Vue UI Primitive for endless composability.
- **Accessible**. Chakra UI components follows the WAI-ARIA guidelines
  specifications and have the right `aria-*` attributes.
- **Dark Mode 😍**: Most components in Chakra UI are dark mode compatible.

### Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
   a. [With Nuxt](#nuxt-usage)
- [Features](#features)
  - [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Codesandbox starters](#codesandbox-starters)
  - [Storybook Components](#storybook-components)
  - [Development for Contributing:](#development-for-contributing)
    - [Project TODOs:](#project-todos)
- [Contributors ✨](#contributors-%e2%9c%a8)

## Installation
```bash
yarn add @chakra-ui/vue emotion
```
or
```bash
npm install @chakra-ui/vue emotion
```

<a id="nuxt-usage"></a>
>**Note:**
If you're using Nuxt, you need to install `@nuxtjs/emotion` package as well to server-side render your styles.

```bash
yarn add @chakra-ui/vue emotion @nuxtjs/emotion
```

## Usage
**1. Import the Chakra UI plugin in your `main.js` file.**

```js
import Vue from 'vue';
import Chakra from '@chakra-ui/vue'
import App from './App.vue'

Vue.use(Chakra)

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount()

```
**2. Wrap your application inside the Chakra `ThemeProvider`.** We also recommend that you include the `CSSReset` component to normalize all browser styling.

_In your `App.vue` file._
```html
<template>
  <ThemeProvider>
    <CSSReset />

    <!--
      Your application code goes here! 😁
    -->

  </ThemeProvider>
</template>

<script>
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    CSSReset
  }
}
</script>
```
If you'd like to toggle your app between dark and light mode, you can also wrap your application inside the `ColorModeProvider` component.

**3. Hurray!🎉 Now the fun can begin**. You can start using components like so:
```html
<template>
  <ThemeProvider>
    <CSSReset />

    <!--
      Your application code goes here! 😁
    -->
    <Button variantColor="blue">
      Chakra consumed ⚡️
    </Button>
  </ThemeProvider>
</template>

<script>
import {
  ThemeProvider,
  CSSReset,
  Button
} from '@chakra-ui/core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    CSSReset,
    Button
  }
}
</script>
```

### Codesandbox starters
- [Vue Starter](https://codesandbox.io/s/chakra-ui-vue-starter-2sy0g)
- [Nuxt Starter](https://codesandbox.io/s/chakra-ui-nuxt-demo-f8tq4)
  
### Storybook Components
You can also view all developed components in **[Storybook](https://chakra-ui-vue.netlify.com)!**

### Development for Contributing:
Interested in contributing? See our [open issues](/issues)! Remember to take a look at our [CONTRIBUTORS](../../.github/CONTRIBUTING.md) guide.

```bash
yarn install
yarn bootstrap
yarn dev
```

#### Project TODOs:
- [ ] Documentation site (Ongoing)
- [ ] Set up type system for plugin & components export with Typescript

<a id="contributors"></a>
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jbakebwa.dev"><img src="https://avatars2.githubusercontent.com/u/21237954?v=4" width="100px;" alt=""/><br /><sub><b>Jonathan Bakebwa</b></sub></a><br /><a href="https://github.com/codebender828/kiwi-ui/commits?author=codebender828" title="Code">💻</a> <a href="https://github.com/codebender828/kiwi-ui/commits?author=codebender828" title="Tests">⚠️</a> <a href="https://github.com/codebender828/kiwi-ui/commits?author=codebender828" title="Documentation">📖</a></td>
    <td align="center"><a href="http://twitter.com/imesutkoca"><img src="https://avatars2.githubusercontent.com/u/342666?v=4" width="100px;" alt=""/><br /><sub><b>Mesut</b></sub></a><br /><a href="https://github.com/codebender828/kiwi-ui/commits?author=koca" title="Code">💻</a> <a href="https://github.com/codebender828/kiwi-ui/commits?author=koca" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://bit.ly/becomeworldclass"><img src="https://avatars0.githubusercontent.com/u/24433274?v=4" width="100px;" alt=""/><br /><sub><b>Omereshone Kelvin Oghenerhoro</b></sub></a><br /><a href="https://github.com/codebender828/kiwi-ui/commits?author=DominusKelvin" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
