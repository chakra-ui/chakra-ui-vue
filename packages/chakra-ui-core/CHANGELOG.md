# Change Log

## 0.6.4

### Patch Changes

- improvements to style props

## 0.6.3

### Patch Changes

- fix: includes missing style props for border-radius and flex-grow style declarations"

## 0.6.2

### Patch Changes

- 3533e00: Fix: CSwitch component v-model + @change event handler.

## 0.6.2-next.0

### Patch Changes

- Fix: CSwitch component v-model + @change event handler.

## 0.6.1

### Patch Changes

- ## Bug fixes
  - `CCollapse` component name option typo fix
  - `CMenu`: add `as` polymophic prop support for `CMenuItem` component
  - `chakra-loader`: Add documentation for the `chakra-loader` webpack plugin
  - Community: Add link to Chakra UI discord to docs.

## 0.6.0

### Minor Changes

- 38460db: Resolves performance issues my changing the underlying styling api.
  Lots of optimizations in low-level primitives that yield better runtime performance for Chakra UI Vue.

## 0.5.10

### Patch Changes

- Adds the `v-chakra` directive for styling HTML elements

## 0.5.9

### Patch Changes

- fix: add build step to ci publish

## 0.5.8

### Patch Changes

- db7846d: fix: add build step tp release CI job

## 0.5.8-next.0

### Patch Changes

- db7846d: fix: add build step tp release CI job

## 0.5.7

### Patch Changes

- 6da465d: Setup changesets for better package publishing management and CI integration

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.6](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.5...@chakra-ui/vue@0.5.6) (2020-05-19)

### Bug Fixes

- **fontfamily:** default font-family font to body ([19730d8](https://github.com/chakra-ui/chakra-ui-vue/commit/19730d87114438051ebf4b58a454e3b06eed97d8))

## [0.5.5](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.4...@chakra-ui/vue@0.5.5) (2020-05-17)

**Note:** Version bump only for package @chakra-ui/vue

## [0.5.4](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.3...@chakra-ui/vue@0.5.4) (2020-05-16)

**Note:** Version bump only for package @chakra-ui/vue

## [0.5.3](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.2...@chakra-ui/vue@0.5.3) (2020-05-13)

### Bug Fixes

- **cnumberinput:** fix number-input ids created at build time ([cd367d3](https://github.com/chakra-ui/chakra-ui-vue/commit/cd367d31373b966b6ae76dec68ed4dd8b5699e3c))

## [0.5.2](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.1...@chakra-ui/vue@0.5.2) (2020-05-12)

### Bug Fixes

- upgraded tooltip modifiers ([b99aa1b](https://github.com/chakra-ui/chakra-ui-vue/commit/b99aa1b13187ba0db8c9caaf95ecc995f304ba4b))

## [0.5.1](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.5.0...@chakra-ui/vue@0.5.1) (2020-05-12)

### Bug Fixes

- popper arrow rotation ([7ca30e0](https://github.com/chakra-ui/chakra-ui-vue/commit/7ca30e0b2162e2a55052a0261f35fb7448e48c2a))
- popper arrow rotation ([f9439dc](https://github.com/chakra-ui/chakra-ui-vue/commit/f9439dcc9833083c91ae1531f985e187ada40039))
- scroll docs to top ([e3d82a6](https://github.com/chakra-ui/chakra-ui-vue/commit/e3d82a6c06cd5a5c5071edd2a66b315c8a96bd81))

# [0.5.0](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.4.2...@chakra-ui/vue@0.5.0) (2020-05-09)

### Bug Fixes

- light mode component ([e221299](https://github.com/chakra-ui/chakra-ui-vue/commit/e221299705863087a461864c23ddabc39d4ab248))
- **cslider:** added v-model implementation ([1444731](https://github.com/chakra-ui/chakra-ui-vue/commit/14447311cf66becb78fb746cceae945fca6be312))
- **cslider:** added v-model implementation ([924bdd3](https://github.com/chakra-ui/chakra-ui-vue/commit/924bdd3095587210c2bb739de80c5ec69ba9da8c))
- **cslider:** added v-model implementation ([9c012d4](https://github.com/chakra-ui/chakra-ui-vue/commit/9c012d42be82d9052c822e2c6b8fa2187514968e))
- **docs-ccolapse:** fix typo ([5014801](https://github.com/chakra-ui/chakra-ui-vue/commit/50148019960de11822b5c9191c9288ea9a8eb85a))

### Features

- **docs:** add docs for easing function in CCollapse ([956fd0d](https://github.com/chakra-ui/chakra-ui-vue/commit/956fd0d8bd73e654dbd3d1512fb57a2789313fed))

## [0.4.2](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.4.1...@chakra-ui/vue@0.4.2) (2020-05-08)

### Bug Fixes

- update radio docs ([bb5a490](https://github.com/chakra-ui/chakra-ui-vue/commit/bb5a49072b3880ede1f8147c1e06d8b6bcf03078))
- update radio docs ([16325cb](https://github.com/chakra-ui/chakra-ui-vue/commit/16325cb7ae009805ea26b678f65b62aa2c09f6a5))
- **popover:** add dynamic compoennt ids ([5ec7df5](https://github.com/chakra-ui/chakra-ui-vue/commit/5ec7df5341b588e5b9c9d22a6b3601d3884949a0))
- include function in initialfocusref prop types ([cae41bb](https://github.com/chakra-ui/chakra-ui-vue/commit/cae41bb6e10a91e22506c69c4c4c1aa1c855a333))
- **radiobuttongroup:** added v-model implementation ([117bc32](https://github.com/chakra-ui/chakra-ui-vue/commit/117bc320c3c4c54b9b52f67e0d394ef2eab6e041))
- **radiobuttongroup:** added v-model implementation ([b6840ef](https://github.com/chakra-ui/chakra-ui-vue/commit/b6840ef96c7f30f4b57e31c36ef89571c4408027))
- **radiogroup:** fix radio group name prop ([8e29a81](https://github.com/chakra-ui/chakra-ui-vue/commit/8e29a81873bd64cab41ed6e4058cb8bc09e67b8d))
- added support type coersion for number input ([149de1d](https://github.com/chakra-ui/chakra-ui-vue/commit/149de1d589315002f10ceca351a3e564ea8700c3))
- implement v-model on CNumberInput component ([8a6a68d](https://github.com/chakra-ui/chakra-ui-vue/commit/8a6a68d962db5fc92bda663499a91360e6f66613))
- implement v-model on CNumberInput component ([055fc01](https://github.com/chakra-ui/chakra-ui-vue/commit/055fc0131f6dcec0bc9b47c63eb92463811b83b6))

## [0.4.1](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.4.0...@chakra-ui/vue@0.4.1) (2020-05-08)

**Note:** Version bump only for package @chakra-ui/vue

# [0.4.0](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.13...@chakra-ui/vue@0.4.0) (2020-05-08)

### Bug Fixes

- **popper:** better anchor event listener handling ([6c495d2](https://github.com/chakra-ui/chakra-ui-vue/commit/6c495d26afcd6e8fe7646ced5887d60485e3eedb))
- **popper:** checks for arrow ([a6ab6dd](https://github.com/chakra-ui/chakra-ui-vue/commit/a6ab6ddd27206cea43d2f2d36719bb055840f455))
- getting stated docs ([d6aa8b1](https://github.com/chakra-ui/chakra-ui-vue/commit/d6aa8b1a618fc96f596a9979767c9bb414f490bc))

### Features

- **avatar:** added avatar docs ([257f3ff](https://github.com/chakra-ui/chakra-ui-vue/commit/257f3ff36cc55de52173b04fc980506f222d1390))
- **avatar:** added code examples ([f0968cb](https://github.com/chakra-ui/chakra-ui-vue/commit/f0968cb48dc472c7ee8a3476aa5a251576846367))
- **avatar:** docs ([2f5b381](https://github.com/chakra-ui/chakra-ui-vue/commit/2f5b381fbb074a8785513d1c7141f5e80d37c99c))
- **cinputaddon:** added review ([9bf1d6d](https://github.com/chakra-ui/chakra-ui-vue/commit/9bf1d6da443d6bc0a9da95f46d2ac46ae97b401e))
- **cinputelement:** added review ([678d45b](https://github.com/chakra-ui/chakra-ui-vue/commit/678d45b60929b05da93582ca85c44bd0874a0160))
- **cinputgroup:** added review ([42fdda1](https://github.com/chakra-ui/chakra-ui-vue/commit/42fdda1808affdcd99b3967e663f2db598835aea))
- **grid:** add grid docs ([d05ae14](https://github.com/chakra-ui/chakra-ui-vue/commit/d05ae14b21ea0b8639c443a40f463b5cc381587a))
- **iconbutton:** review iconbutton component ([7da4918](https://github.com/chakra-ui/chakra-ui-vue/commit/7da49182bd119446184763b911caf1b17a05661c))
- **image:** review image component ([adcaed6](https://github.com/chakra-ui/chakra-ui-vue/commit/adcaed662d871a48f81e7aedd75ee970f4042d5a))
- **image:** review image component ([4c95f01](https://github.com/chakra-ui/chakra-ui-vue/commit/4c95f013b03c49f19f807067634e789a1902a8b8))
- **menu:** improve clickaway ([ed5e320](https://github.com/chakra-ui/chakra-ui-vue/commit/ed5e32078dd2c404724cc68588d3426dca75535c))
- **menu:** improve clickaway ([0b44af5](https://github.com/chakra-ui/chakra-ui-vue/commit/0b44af5e3ae8241be02d07ee3c4ba7eb31644d96))

## [0.3.13](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.12...@chakra-ui/vue@0.3.13) (2020-04-26)

### Bug Fixes

- **c-modal:** extract final focus ref from function type ([b9c1be7](https://github.com/chakra-ui/chakra-ui-vue/commit/b9c1be787aff6a445a14fc71bc98a616f5ea927d))
- **c-radio-group:** implement v-model ([fbc4342](https://github.com/chakra-ui/chakra-ui-vue/commit/fbc4342172abb145f8fcabb2a6b7fe53b9cacbb1))
- **collapse:** compose box props for collapse component ([5f4a7ef](https://github.com/chakra-ui/chakra-ui-vue/commit/5f4a7efbc648f07fbb4bffc612069620f4688318))
- **iconbutton:** add required prop for aria-label ([3d71724](https://github.com/chakra-ui/chakra-ui-vue/commit/3d71724e208ff5eed741637c0cf2ef1bf750bfb7))
- **image:** fix fallback source ([916a851](https://github.com/chakra-ui/chakra-ui-vue/commit/916a851d212fa65d1db96cdf66a86419a1ec37af))
- **image:** fix size prop form image component ([18fe564](https://github.com/chakra-ui/chakra-ui-vue/commit/18fe564b918e7d9bd3dee3d850c6860a2a966244))

### Features

- **aspect-ratio:** add aspect ratio tests ([9f36701](https://github.com/chakra-ui/chakra-ui-vue/commit/9f3670176df845ffcd5c2e489d6c3c51fe61c5b7))
- **control-box:** add tests for ControlBox ([64359b5](https://github.com/chakra-ui/chakra-ui-vue/commit/64359b5183e6ecc85ae29d93852647724062c2bd))
- **heading:** add truncation ([6e05ebd](https://github.com/chakra-ui/chakra-ui-vue/commit/6e05ebdcc57ac240d8c91062fba85d2f9fd20301))
- **text:** add truncation ([ed09546](https://github.com/chakra-ui/chakra-ui-vue/commit/ed09546e26e23a2ed13c054edf616dee77ebe5d6))

## [0.3.12](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.11...@chakra-ui/vue@0.3.12) (2020-04-16)

### Features

- **drawer:** add a11y report ([f86e655](https://github.com/chakra-ui/chakra-ui-vue/commit/f86e655b94fb5ecf46d5089bc9ab7f2e8facfe34))
- **editbale:** add editable props ([d8d0329](https://github.com/chakra-ui/chakra-ui-vue/commit/d8d0329a30206dbb3e5bc448450baf628b6ba714))
- **formcontrol:** added form control a11y report ([11ef761](https://github.com/chakra-ui/chakra-ui-vue/commit/11ef7614ccfc93f40d3d85b77723ebe21cb71218))

## [0.3.11](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.10...@chakra-ui/vue@0.3.11) (2020-04-16)

### Bug Fixes

- **divider:** fix border color ([d60d6fd](https://github.com/chakra-ui/chakra-ui-vue/commit/d60d6fd284e8561e14db193ec9e3bf473cccded8))
- **divider:** fix border color\_ ([98d6fb6](https://github.com/chakra-ui/chakra-ui-vue/commit/98d6fb62be331e8dc55bc0d2402b8f91b3f6d98f))
- **tooltip:** assign aria-describedby on mouseover ([3ff348e](https://github.com/chakra-ui/chakra-ui-vue/commit/3ff348eac7421b9aa304bb1b98615d84bcafb1d3))
- **tooltip:** dismiss tooltip when tooltip element is focused on escape ([e48ca12](https://github.com/chakra-ui/chakra-ui-vue/commit/e48ca12e1789e93b697bc0831d797de20cbfa3fd))

### Features

- update tooltip component sig ([882f90e](https://github.com/chakra-ui/chakra-ui-vue/commit/882f90e30cc92c31238c245a3d10ab4a4b1e01bb))
- **controlbox:** add controlbox jsdoc ([f1a9820](https://github.com/chakra-ui/chakra-ui-vue/commit/f1a9820de3eb9aba3379764c9739e442ef47fee2))
- **controlbox:** update controlbox jsdoc strategy ([da6d027](https://github.com/chakra-ui/chakra-ui-vue/commit/da6d0279c894f30b5f6ae34f6da867c05c1d6432))
- add circular progress ally report ([dce3dea](https://github.com/chakra-ui/chakra-ui-vue/commit/dce3dea52b76b21309db9f67af2476d8f8b3f729))

## [0.3.10](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.9...@chakra-ui/vue@0.3.10) (2020-04-12)

**Note:** Version bump only for package @chakra-ui/vue

## [0.3.9](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.8...@chakra-ui/vue@0.3.9) (2020-04-11)

**Note:** Version bump only for package @chakra-ui/vue

## [0.3.8](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.7...@chakra-ui/vue@0.3.8) (2020-04-11)

### Features

- **creset:** reset styles on server using created hook ([c6e8753](https://github.com/chakra-ui/chakra-ui-vue/commit/c6e8753ec892e367fa8c3fbc1a1379935afdaf2e))

## [0.3.7](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.6...@chakra-ui/vue@0.3.7) (2020-04-08)

### Bug Fixes

- **alert:** esling ([7dd004b](https://github.com/chakra-ui/chakra-ui-vue/commit/7dd004b7cdfd2156204ae6dcefaa05800e80b555))
- **alert:** normalized all alert variants to kebab-case ([f736bf5](https://github.com/chakra-ui/chakra-ui-vue/commit/f736bf50952b451e11593b19f235f726c71073b2))
- **avatar:** add avatar alt overwrite ([67b87e5](https://github.com/chakra-ui/chakra-ui-vue/commit/67b87e5cc145cf287e72ed43b5eb9746343ef50f))
- **avatar:** added flex-shrink prop to props ([8f22f81](https://github.com/chakra-ui/chakra-ui-vue/commit/8f22f814507241346d4ec4948751fae3837689cf))
- **button:** fixed outline button bug ([3260c2e](https://github.com/chakra-ui/chakra-ui-vue/commit/3260c2e97244a1be66ed3606e96c3d3db1e99dc4))
- **props:** add box-shadow to base props ([0667da6](https://github.com/chakra-ui/chakra-ui-vue/commit/0667da6a8cb4a9fb7dfd4b15cd8b4d681fff7235))

### Features

- added checkbox ally ([90d296d](https://github.com/chakra-ui/chakra-ui-vue/commit/90d296d5a6770fdb184e752871b984e61cee573a))
- **accordion:** add accesiblity.md ([bf85fa9](https://github.com/chakra-ui/chakra-ui-vue/commit/bf85fa96e1d8ca0dba0d7b8ebcab5fb8e0c2e51a))
- **alert:** add alert accessibility.md ([7677e81](https://github.com/chakra-ui/chakra-ui-vue/commit/7677e818a91dcbfb98a3e99de4a4ab337f81d575))
- **alert:** add alert accessibility.md ([2b6e1d5](https://github.com/chakra-ui/chakra-ui-vue/commit/2b6e1d574fb8f139a054f73063c34a411c8aa99d))
- **alertdialog:** added accessibility.md ([44d9677](https://github.com/chakra-ui/chakra-ui-vue/commit/44d96772d8e3bee0036bf8b7f4d8f7c856620a0a))
- **aspectratiobox:** added aspect ratio box jsdoc ([2f12a76](https://github.com/chakra-ui/chakra-ui-vue/commit/2f12a76f204580f8150e8c247c3737e6a2145767))
- **avatar:** added avatar docs ([5e01644](https://github.com/chakra-ui/chakra-ui-vue/commit/5e01644c850f4e6ecb5d189926a10f722b24d37b))
- **avatar:** added avatar docs ([c610cdb](https://github.com/chakra-ui/chakra-ui-vue/commit/c610cdbb91e7aac5142466c5521b5e8116647374))
- **badge:** review badge component ([09391a9](https://github.com/chakra-ui/chakra-ui-vue/commit/09391a9d45b202b5644dc16f79daccd50f3c0cbb))
- **box:** add jsdocs for box ([a2585e0](https://github.com/chakra-ui/chakra-ui-vue/commit/a2585e09c02509a1a33aea1d5848206546bd9e8f))
- **breadcrumb:** add accessibility.md ([257d262](https://github.com/chakra-ui/chakra-ui-vue/commit/257d26295a92b2ee77d2ea66f023975cea3c0b9f))
- **breadcrumb:** add component sig ([ae2b76e](https://github.com/chakra-ui/chakra-ui-vue/commit/ae2b76e099023668275a12f479347c428be6f22e))
- **breadcrumb:** add jsdocs ([8713fea](https://github.com/chakra-ui/chakra-ui-vue/commit/8713fea6e6708c06887771c065c7710545739026))
- **button:** add ally report ([91d26ae](https://github.com/chakra-ui/chakra-ui-vue/commit/91d26ae5144aa056b515602917bd471adb1334d9))
- **buttongroup:** update component docs ([a301961](https://github.com/chakra-ui/chakra-ui-vue/commit/a3019612e2678fb0630bad95075e14703f651091))
- update aspectratiobox import ([98daea6](https://github.com/chakra-ui/chakra-ui-vue/commit/98daea6ee3016a5b3f39f4ba5c2d8a066436446c))

## [0.3.6](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.5...@chakra-ui/vue@0.3.6) (2020-03-29)

**Note:** Version bump only for package @chakra-ui/vue

## [0.3.5](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.4...@chakra-ui/vue@0.3.5) (2020-03-29)

**Note:** Version bump only for package @chakra-ui/vue

## [0.3.4](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.3...@chakra-ui/vue@0.3.4) (2020-03-24)

### Bug Fixes

- improve MenuGroup spacing variables ([5289734](https://github.com/chakra-ui/chakra-ui-vue/commit/5289734b3fc75f03b74e18a3bff442eca2888eed))
- improve Modal exports ([461d5fa](https://github.com/chakra-ui/chakra-ui-vue/commit/461d5fa6e9c39ff363501fe78a3149e99918ca41))
- improve Slider exports and fix slider transition perf ([5d44f09](https://github.com/chakra-ui/chakra-ui-vue/commit/5d44f09b9a507253349da5004e67a70a4f075a51))
- resolve Switch imports ([5f16bbd](https://github.com/chakra-ui/chakra-ui-vue/commit/5f16bbda8ebea061b00e67709f2ecfc80284a52e))

### Features

- **select:** implement v-model ([34b1156](https://github.com/chakra-ui/chakra-ui-vue/commit/34b1156b7c3e90cb950264f0fcea313357b06ef3))

## [0.3.3](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.2...@chakra-ui/vue@0.3.3) (2020-03-22)

**Note:** Version bump only for package @chakra-ui/vue

## [0.3.2](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.1...@chakra-ui/vue@0.3.2) (2020-03-22)

### Bug Fixes

- **editable:** change event handler for native input ([1c3fe9d](https://github.com/chakra-ui/chakra-ui-vue/commit/1c3fe9d68414f269de5e42e252448904652c6fa6))
- **editable:** fix aria-disabled typo ([764258e](https://github.com/chakra-ui/chakra-ui-vue/commit/764258ec8d9b2575befb772f0c82b685f01113f7))
- **editable:** fix blur event only call onSubmit ([23c737c](https://github.com/chakra-ui/chakra-ui-vue/commit/23c737c5d60a8ee87971f8f16bce8425b1b06149))

### Features

- **editable:** add storybook for editable component ([074d2e3](https://github.com/chakra-ui/chakra-ui-vue/commit/074d2e305fdddf696b7a0661ba6314f17aff7074))
- **edtiable:** add tests for editable component ([2801710](https://github.com/chakra-ui/chakra-ui-vue/commit/280171058ca78c2c587372ee501ecc6ebf96822d))
- **stat:** add stat component ([767b026](https://github.com/chakra-ui/chakra-ui-vue/commit/767b026de5f5694d11225e1eed08671965d04921))

## [0.3.1](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.3.0...@chakra-ui/vue@0.3.1) (2020-03-21)

**Note:** Version bump only for package @chakra-ui/vue

# [0.3.0](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.2.6...@chakra-ui/vue@0.3.0) (2020-03-21)

### Bug Fixes

- **button:** preserve button width on loading ([caba0aa](https://github.com/chakra-ui/chakra-ui-vue/commit/caba0aadc5f40928660c5250e9e2c99dc4ca7fe0))
- **modal:** add removeeventhandler for potential memory leak ([b13a14c](https://github.com/chakra-ui/chakra-ui-vue/commit/b13a14c3b8be93a26b11c46f0c830a64f69a7df2))
- **modal:** change modal header div to header ([eb066cb](https://github.com/chakra-ui/chakra-ui-vue/commit/eb066cbab4c771ec5ca360a2b0b52bce3e2f9dd0))
- **modal:** disable inherit attrs for ModalContent component ([d226e50](https://github.com/chakra-ui/chakra-ui-vue/commit/d226e501c9624af076732de3479df9df2268c9fa))
- **modal:** fix aria for modal component ([757df81](https://github.com/chakra-ui/chakra-ui-vue/commit/757df8147939fa575b44b4f54228d7521243cb7c))
- **modal:** fix initialFocusRef and finalFocusRef ([211130a](https://github.com/chakra-ui/chakra-ui-vue/commit/211130a75c0ed9a32290b0209264a4a10aa9c9f8))
- **modal:** fix onclose prop for modal and drawers etc ([a9e8e99](https://github.com/chakra-ui/chakra-ui-vue/commit/a9e8e991ff816dbf1c28f1f61d0f39d4c8049693))

### Features

- **drawer:** add closeOnEsc support for drawer ([bad4f81](https://github.com/chakra-ui/chakra-ui-vue/commit/bad4f81a84f3dbc254c9aced5e45876be8be0e9e))
- **drawer:** add stories for Drawer component ([e5ff0c3](https://github.com/chakra-ui/chakra-ui-vue/commit/e5ff0c31aa7af90b34301ac083f321a70ff13563))
- **styles:** add docs styles ([5d37a47](https://github.com/chakra-ui/chakra-ui-vue/commit/5d37a471d9314a263722cb7d45605ed66672e29d))
- **test:** update button tests ([aceedf4](https://github.com/chakra-ui/chakra-ui-vue/commit/aceedf4033d870e663f9a98296b481202141e9f2))
- promote layouts ([9671e9b](https://github.com/chakra-ui/chakra-ui-vue/commit/9671e9b1415ff326b767abef957dfa2e6c68e687))

## [0.2.6](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.2.4...@chakra-ui/vue@0.2.6) (2020-03-17)

### Bug Fixes

- **radio:** remove defaultchecked from attrs ([3f5e067](https://github.com/chakra-ui/chakra-ui-vue/commit/3f5e0673bfdae0a39ad59006ade7e61149bb6982))
- **radio-button-group:** clean RadioButtonGroup children ([9c0890e](https://github.com/chakra-ui/chakra-ui-vue/commit/9c0890e0553aee6a2324513d4345c07e2914d762))
- **select:** fix select slot issue ([70fd1cf](https://github.com/chakra-ui/chakra-ui-vue/commit/70fd1cf7efa15478c649b674053d20a51cc027e9))
- **storybook:** refactor progress story ([428d0fb](https://github.com/chakra-ui/chakra-ui-vue/commit/428d0fbce83a45119ffc5561113c311c6cb7bf5f))

## 0.2.5 (2020-03-15)

### Bug Fixes

- added signature to themeprovider ([f209251](https://github.com/chakra-ui/chakra-ui-vue/commit/f2092514eb2b809ce5a188d646fd8b5b554d4915))

## [0.2.4](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.2.3...@chakra-ui/vue@0.2.4) (2020-03-15)

**Note:** Version bump only for package @chakra-ui/vue

## [0.2.3](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.2.2...@chakra-ui/vue@0.2.3) (2020-03-15)

**Note:** Version bump only for package @chakra-ui/vue

## [0.2.2](https://github.com/chakra-ui/chakra-ui-vue/compare/@chakra-ui/vue@0.2.1...@chakra-ui/vue@0.2.2) (2020-03-14)

**Note:** Version bump only for package @chakra-ui/vue

## [0.2.1](https://github.com/codebender828/kiwi-ui/compare/@chakra-ui/vue@0.2.0...@chakra-ui/vue@0.2.1) (2020-03-14)

**Note:** Version bump only for package @chakra-ui/vue

# 0.2.0 (2020-03-14)

### Bug Fixes

- **aliases:** pix aliases proxies ([f8ce8e8](https://github.com/codebender828/kiwi-ui/commit/f8ce8e8c26941e774f098fcbd4732b3739805476))
- linting ([4328233](https://github.com/codebender828/kiwi-ui/commit/4328233a86c8e69cc149f8d3207aa0d199314fba))
- update test imports ([5c2c93d](https://github.com/codebender828/kiwi-ui/commit/5c2c93db2d9f70f863ca5cfce09a1247fcea62bc))

### Features

- **props:** handling transform aliases with pxls ([6a5f773](https://github.com/codebender828/kiwi-ui/commit/6a5f773e1aee9fdecf3fddf63056264524c1dad8))

# 0.1.0 (2020-03-14)

### Bug Fixes

- **aliases:** pix aliases proxies ([f8ce8e8](https://github.com/codebender828/kiwi-ui/commit/f8ce8e8c26941e774f098fcbd4732b3739805476))
- linting ([4328233](https://github.com/codebender828/kiwi-ui/commit/4328233a86c8e69cc149f8d3207aa0d199314fba))
- update test imports ([5c2c93d](https://github.com/codebender828/kiwi-ui/commit/5c2c93db2d9f70f863ca5cfce09a1247fcea62bc))

### Features

- **props:** handling transform aliases with pxls ([6a5f773](https://github.com/codebender828/kiwi-ui/commit/6a5f773e1aee9fdecf3fddf63056264524c1dad8))

## [1.4.3](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.4.2...kiwi-core@1.4.3) (2019-12-24)

**Note:** Version bump only for package kiwi-core

## [1.4.2](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.4.1...kiwi-core@1.4.2) (2019-12-24)

**Note:** Version bump only for package kiwi-core

## [1.4.1](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.4.0...kiwi-core@1.4.1) (2019-12-24)

**Note:** Version bump only for package kiwi-core

# [1.4.0](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.3.1...kiwi-core@1.4.0) (2019-12-24)

## 0.1.22 (2019-12-23)

### Bug Fixes

- modal stories update ([309da95](https://github.com/codebender828/kiwi-ui/commit/309da95dfa4b1caa744c86aca669c9f7a3437e50))
- **drawer:** transition is now working at last lol ([73b43ff](https://github.com/codebender828/kiwi-ui/commit/73b43ffbfe11d2d413f85289e4baabcbc1488bcc))
- **modal:** attach click event to overlay ([3230491](https://github.com/codebender828/kiwi-ui/commit/323049182ec1dc0f60c9a1f9b9bd5e1f92d7f933))
- **modal:** focuses on first focusable el ([8a465a3](https://github.com/codebender828/kiwi-ui/commit/8a465a3cfb92d6bb6c050c0e45c44f68fb8619d8))
- **slide:** horizontal offset directions ([cdcc82e](https://github.com/codebender828/kiwi-ui/commit/cdcc82e52cd6e275a5bfbf7723a501da3613f3fc))

### Features

- **css:** css component ([d1aebb6](https://github.com/codebender828/kiwi-ui/commit/d1aebb638d2761d40cfb943813ace6dae04eeac2))
- **cssreset:** added css reset component ([bcad85d](https://github.com/codebender828/kiwi-ui/commit/bcad85d80a3860fc0cef2d1256dbdd35428a5806))
- added slide transition component ([0bc2869](https://github.com/codebender828/kiwi-ui/commit/0bc28696a37e666635eff52ca186f32f9c3f0c1e))
- added use disclosure hook for drawer ([80acd70](https://github.com/codebender828/kiwi-ui/commit/80acd700a879312d3409d396d4043abbe47b1b53))
- **scale:** added scale component ([e4ec2bb](https://github.com/codebender828/kiwi-ui/commit/e4ec2bb587ba13a73e57d758f248f8ef6ff8a2fe))
- **slide:** added reactivity to slide component ([0571b39](https://github.com/codebender828/kiwi-ui/commit/0571b396701174b428fbe19eba3f3e5e02e12daa))
- **slide:** added validators and error messages ([37b6cce](https://github.com/codebender828/kiwi-ui/commit/37b6cce4d7d8251d2774d98188e2c3176628ec3c))
- **slidein:** added slidein component ([8c0ab6e](https://github.com/codebender828/kiwi-ui/commit/8c0ab6ef5182e8ecefae25fdcf975f28bbb346f7))
- **utils:** added VNode helpers and validators ([727a956](https://github.com/codebender828/kiwi-ui/commit/727a956c8cdb9945a4d484df36ce36457677304f))
- unwrap values utility ([44b1263](https://github.com/codebender828/kiwi-ui/commit/44b12633aa2476a5044f58ea4a1df0477fa46196))

## [1.3.1](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.3.0...kiwi-core@1.3.1) (2019-12-17)

**Note:** Version bump only for package kiwi-core

# [1.3.0](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.2.3...kiwi-core@1.3.0) (2019-12-17)

### Bug Fixes

- **closebutton:** cursor pointer ([49fd930](https://github.com/codebender828/kiwi-ui/commit/49fd930f1450acef97db641a905cf23adaa77c2a))
- **modal:** undo aria hidden fix ([e90451b](https://github.com/codebender828/kiwi-ui/commit/e90451bf53bf7a7f8f8759ead31148881a139958))

### Features

- **buttongroup:** added button group ([90cf30b](https://github.com/codebender828/kiwi-ui/commit/90cf30b191379f7e5cbbb72956f5578d1caed4f6))
- **controlbox:** added control box component ([6983d71](https://github.com/codebender828/kiwi-ui/commit/6983d711d5ea3d140689f950d6817a050a962610))
- **controlbox:** added controlbox component ([586c74d](https://github.com/codebender828/kiwi-ui/commit/586c74dd8c7c6a1df1ba994261230941871e3dcf))
- **heading:** added heading component and story ([731df35](https://github.com/codebender828/kiwi-ui/commit/731df35e1ec7768be4235583b5c9a178cbd38f68))
- **modal:** all things about the root modal are working :) ([81a7a5b](https://github.com/codebender828/kiwi-ui/commit/81a7a5b7e89f1fcf6cd20f4f01b58c6704751888))
- **modal:** initial focus node ([6aae873](https://github.com/codebender828/kiwi-ui/commit/6aae8735b53a9fa61ca8cd7ac2d1062fab18785f))
- **modal:** managed to create focus ([d31f79e](https://github.com/codebender828/kiwi-ui/commit/d31f79e5c0722d84ff518343c73006a95f5bb70f))
- **modal:** setup for modal ([4d88761](https://github.com/codebender828/kiwi-ui/commit/4d88761d1719e4137c68b0c672acac8136117832))
- **modal:** storiess and focus management ([032eaf4](https://github.com/codebender828/kiwi-ui/commit/032eaf477597ab3e1cf76b0bd5f97a90bbdb1d75))
- **portal:** added portal component ([29bf0c9](https://github.com/codebender828/kiwi-ui/commit/29bf0c9e1c01751494fce306e271a6150049a3b9))
- **stack:** added stackc omponent ([2cb2e34](https://github.com/codebender828/kiwi-ui/commit/2cb2e34633b5fd22fa6a0707a621020cedb3f9ba))

## [1.2.3](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.2.2...kiwi-core@1.2.3) (2019-12-07)

**Note:** Version bump only for package kiwi-core

## [1.2.2](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.2.1...kiwi-core@1.2.2) (2019-12-07)

**Note:** Version bump only for package kiwi-core

## [1.2.1](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.2.0...kiwi-core@1.2.1) (2019-12-07)

**Note:** Version bump only for package kiwi-core

# [1.2.0](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.1.1...kiwi-core@1.2.0) (2019-12-07)

### Features

- **avatargroup:** created Avatar group ([1964240](https://github.com/codebender828/kiwi-ui/commit/196424037f00faa5b152c6f98da150e19ac5bd02))
- **avatargroup:** destructuring propsdata vnodes ([99b5612](https://github.com/codebender828/kiwi-ui/commit/99b5612ada32384daeb3c78a33c8a066774a3653))
- **flex:** added flex stories ([30640a3](https://github.com/codebender828/kiwi-ui/commit/30640a3bc24187559536154447f74e93c697625e))
- **flex:** created flex component ([7799885](https://github.com/codebender828/kiwi-ui/commit/77998850a267a14446aa0e0fcdf81e81b9e4b838))
- **refs:** using `forwardRef` prop to forward ([458ed1f](https://github.com/codebender828/kiwi-ui/commit/458ed1f9d66d0f6efc45821dd54cfc7fecc46e50))

## [1.1.1](https://github.com/codebender828/kiwi-ui/compare/kiwi-core@1.1.0...kiwi-core@1.1.1) (2019-12-03)

**Note:** Version bump only for package kiwi-core

# 1.1.0 (2019-12-03)

### Features

- **avatar:** added Avatar components ([56e34e0](https://github.com/codebender828/kiwi-ui/commit/56e34e09ad522096fb412a1ace4eb7515de04840))

## 1.0.16 (2019-12-03)

## 1.0.15 (2019-12-03)

## 1.0.14 (2019-12-03)

## 1.0.13 (2019-12-03)

## [1.0.16](https://github.com/codebender828/kiwi-ui/compare/v1.0.15...v1.0.16) (2019-12-03)

**Note:** Version bump only for package kiwi-core

## [1.0.15](https://github.com/codebender828/kiwi-ui/compare/v1.0.14...v1.0.15) (2019-12-03)

**Note:** Version bump only for package kiwi-core

## [1.0.14](https://github.com/codebender828/kiwi-ui/compare/v1.0.13...v1.0.14) (2019-12-03)

**Note:** Version bump only for package kiwi-core

## [1.0.13](https://github.com/codebender828/kiwi-ui/compare/v1.0.12...v1.0.13) (2019-12-03)

**Note:** Version bump only for package kiwi-core

## [1.0.12](https://github.com/codebender828/kiwi-ui/compare/v1.0.11...v1.0.12) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.11](https://github.com/codebender828/kiwi-ui/compare/v1.0.10...v1.0.11) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.10](https://github.com/codebender828/kiwi-ui/compare/v1.0.9...v1.0.10) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.9](https://github.com/codebender828/kiwi-ui/compare/v1.0.8...v1.0.9) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.8](https://github.com/codebender828/kiwi-ui/compare/v1.0.7...v1.0.8) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.7](https://github.com/codebender828/kiwi-ui/compare/v1.0.6...v1.0.7) (2019-12-03)

### Bug Fixes

- font family for components ([92f7c34](https://github.com/codebender828/kiwi-ui/commit/92f7c3416f5a9a7b4bac9e459993ba8d19d3df0e))

## [1.0.6](https://github.com/codebender828/kiwi-ui/compare/v1.0.5...v1.0.6) (2019-12-03)

**Note:** Version bump only for package kiwi

## [1.0.5](https://github.com/codebender828/kiwi-ui/compare/v1.0.4...v1.0.5) (2019-12-02)

**Note:** Version bump only for package kiwi

## [1.0.4](https://github.com/codebender828/kiwi-ui/compare/v1.0.3...v1.0.4) (2019-12-02)

**Note:** Version bump only for package kiwi

## [1.0.3](https://github.com/codebender828/kiwi-ui/compare/v1.0.2...v1.0.3) (2019-12-02)

**Note:** Version bump only for package @akkadu/kiwi-flight

## [1.0.2](https://github.com/codebender828/kiwi-ui/compare/v1.0.1...v1.0.2) (2019-12-02)

**Note:** Version bump only for package @akkadu/kiwi-flight

## 1.0.1 (2019-12-02)

**Note:** Version bump only for package @kiwi-ui/core
