const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')
const customTheme = require('../example/utils/theme')
/**
 * nuxtjs/module-test-utils is unable
 * to fully support some of the recent nuxtjs
 * features like module resolving inside the
 * nuxt module.
 *
 * Without this working properly
 * it makes developing on top of the tests
 * unreliable.
 *
 * I've spoken to the Nuxt team about this
 * and I they're making some improvemtns
 * to the @nuxtjs/module-test-utils
 * package.
 *
 * Since this is still something to be
 * improved, I hope to run these tests again.re
 *
 * Contributions are welcome!
 */
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
    expect(html).toContain('data-chakra-component="CThemeProvider"')
  })

  test('should accept extended variables nuxt config', async () => {
    const html = await get('/')
    expect(html).toContain(`data-test-custom-theme-color="${customTheme.colors.brand[200]}`)
  })
})
