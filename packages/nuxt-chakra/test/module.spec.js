const { join } = require('path')
const { get } = require('@nuxtjs/module-test-utils')
const { Nuxt, Builder } = require('nuxt')
const customTheme = require('../example/utils/theme')
const chakraNuxtModule = require('..')

describe('module', () => {
  let nuxt
  const PORT = 4000

  beforeAll(async () => {
    const rootDir = join(__dirname, '..', 'example')
    /** Nuxt config */
    const config = {
      rootDir,
      modules: [
        chakraNuxtModule
      ],
      chakra: {
        extendTheme: customTheme
      }
    }

    /** Create new Nuxt instance */
    nuxt = new Nuxt(config)
    const build = new Builder(nuxt)
    await build.validatePages()
    await build.generateRoutesAndFiles()
    await nuxt.listen(PORT)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('renders app', async () => {
    const html = await get('/')
    expect(html).toContain('⚡️ Hello chakra-ui/vue')
  })

  // test('renders ThemeProvider component', async () => {
  //   const html = await get('/')
  //   expect(html).toContain('data-chakra-component="CThemeProvider"')
  // })

  // test('should accept extended variables nuxt config', async () => {
  //   const html = await get('/')
  //   expect(html).toContain(`data-test-custom-theme-color="${customTheme.colors.brand[200]}`)
  // })
})
