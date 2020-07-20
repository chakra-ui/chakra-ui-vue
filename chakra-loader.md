# Chakra UI Vue Webpack Loader

This is a rough implementation plan of how the `chakra-loader` will import and register components on the fly

- [ ] Compile template and extract only Chakra UI Vue tags. (Both in `kebab-case` and in `PascalCase`) and put them a `new Set()` with the `PascalCase` tags as entries.
- [ ] Check if the module exists from `@chakra-ui/vue`.
  - [ ] if it is a reactive component, we register it
  - [ ] if it is functional, we provide the functional patch before registering it.
- [ ] For each of those tags we need to create an import statement and append it to the top of the file in the webpack `install` function
  - [ ] Call install in the `chakra-loader`