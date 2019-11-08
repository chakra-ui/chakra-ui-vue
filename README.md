<br />
<h1 align="center">🥝 Kiwi UI</h1>
<h4 align="center">Build scalable, accessible, and light-weight, Vue.js applications with ease.</h4>

### 📦 Components
A complete list of all components to be built can be found here 👇🏽.

<a href="https://www.notion.so/b379efc7b0f24060b840be7f6c2d0bbb?v=e32ed8a0bce04621975feef3ff344c07" target="_blank" style="background: #c9ec91; color: #2a4106; padding: 0.7em; border-radius: 4px; font-weight: 700; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);">🥝 View Kiwi Components</a>

### Browsing Components
You can also view all developed components in Storybook!

<a href="https://kiwi-ui.netlify.com" target="_blank" style="background: #2a4106; color: #9fdc3c; padding: 0.7em; border-radius: 4px; font-weight: 700; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);">🔖 View Storybook</a>

## Development
This current verison of Kiwi uses a forked version of `vue-styled-components`. This will be replaced in the near future. I order to get started with the development environment, run the following commands to install all packages and then build `vue-styled-components` dist. And voila! You're good to go. You only need to run this once after running `yarn install` on this repository.

```bash
yarn install
yarn build-vsc
yarn serve
```

#### Project TODO:
- [x] Setup Storybook for components UI
- [x] Theme Provider
- [x] Develop styling scheme for components with styled components
- [x] Setup Vue.js plugin system
  - [x] Provide Theme
  - [x] Observe theme and set it dynamically in javascript with ease.
- [x] Provide icons API for icons component
- [x] Accessibility (Focus) Styling
- [ ] Make `createContext` API for Kiwi
  - [ ] This component should return provider and corresponding consumer. Should be used for component creation.
- [ ] Setup NPM distribution
- [ ] Set up type system for components with Typescript

