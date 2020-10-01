const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')
const customTheme = require('../example/autoimport/utils/theme')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await setup(loadConfig(__dirname, '../../example/autoimport')))
  }, 120000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('renders app', async () => {
    const html = await get('/')
    expect(html).toContain('⚡️ Hello chakra-ui/vue')
  })

  test('renders ThemeProvider component', async () => {
    const html = await get('/')
    expect(html).toContain('data-chakra-component="c-theme-provider"')
  })

  test('should accept extended variables nuxt config', async () => {
    const html = await get('/')
    expect(html).toContain(`data-test-custom-theme-color="${customTheme.colors.brand[200]}`)
  })
})
