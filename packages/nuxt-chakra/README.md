<h1 align="center">@chakra-ui/nuxt</h1>

> Chakra UI Module for Nuxt.js

## Looking for documentation?
See [Documentation site here](https://vue.chakra-ui.com/with-nuxt)

## Setup

1. Add `@chakra-ui/nuxt` dependency to your project

```bash
yarn add @chakra-ui/nuxt @nuxtjs/emotion
```

2. Add `@chakra-ui/nuxt` & `@nuxtjs/emotion` to the `modules` section of `nuxt.config.js`

```js
// nuxt.config.js
export default {
  modules: [
    '@chakra-ui/nuxt',
    '@nuxtjs/emotion'
  ],
  /**
   * Add extend the plugin options under the `chakra` key.
   **/
  chakra: {
    extendTheme: {
      colors: {
        brand: { /* ... */ }
      }
    }
  }
}
```

3. Wrap your default layout in `layouts/` directory inside CThemeProvider as seen in the Chakra UI [docs](https://vue.chakra-ui.com/with-nuxt) to start consuming Chakra Components. Like so:

```vue
<template>
  <c-theme-provider>
    <c-reset/>
    <nuxt/>
  </c-theme-provider>
</template>

<script>
import {
  CThemeProvider,
  CReset,
  CButton
} from "@chakra-ui/vue";

export default {
  name: 'DefaultLayout',
  components: {
    CThemeProvider,
    CReset,
  }
};
</script>
```


## Development

1. Clone this repository
2. Install dependencies using `yarn bootstrap`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

Copyright (c) Kelvin Omereshone <kelvinomereshone@gmail.com>
