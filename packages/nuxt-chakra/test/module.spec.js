const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await setup(loadConfig(__dirname, '../../example')))
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
    console.log(html)
    expect(html).toContain('data-chakra-component="CThemeProvider"')
  })
})
