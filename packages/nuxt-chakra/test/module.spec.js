const { join } = require('path')
const { setup, get } = require('@nuxtjs/module-test-utils')
const customTheme = require('../example/utils/theme')
const chakraNuxtModule = require('..')

describe('module', () => {
  let nuxt

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

    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('renders app', async () => {
    const html = await get('/')
    expect(html).toContain('⚡️ Hello chakra-ui/vue')
  })

  test('renders ThemeProvider component', async () => {
    const html = await get('/')
    expect(html).toContain('data-chakra-component="CThemeProvider"')
  })

  test('should accept extended variables nuxt config', async () => {
    const html = await get('/')
    expect(html).toContain(`data-test-custom-theme-color="${customTheme.colors.brand[200]}`)
  })
})
