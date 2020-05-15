# @nuxtjs/chakraui

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Chakra UI Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/chakraui` dependency to your project

```bash
yarn add @nuxtjs/chakraui # or npm install @nuxtjs/chakraui
```

2. Add `@nuxtjs/chakraui` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/chakraui',

  ]
}
```

3. Wrap your default layout in `layouts/` directory inside CThemeProvider as seen in the Chakra UI [docs](https://vue.chakra-ui.com/with-nuxt) to start consuming Chakra Components. Like so:

```js
<template>
  <c-theme-provider>
    <c-reset/>
    <Nuxt/>
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
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Kelvin Omereshone <kelvinomereshone@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/chakraui/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/chakraui

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/chakraui.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/chakraui

[github-actions-ci-src]: https://github.com/https://github.com/DominusKelvin/chakraui-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/https://github.com/DominusKelvin/chakraui-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/https://github.com/DominusKelvin/chakraui-module.svg
[codecov-href]: https://codecov.io/gh/https://github.com/DominusKelvin/chakraui-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/chakraui.svg
[license-href]: https://npmjs.com/package/@nuxtjs/chakraui
