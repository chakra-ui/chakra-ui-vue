import { join } from 'path'
import { get } from '@nuxtjs/module-test-utils'
import { Nuxt, Builder } from 'nuxt'
import chakraNuxtModule from '..'

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
        extendTheme: {
          colors: {
            brand: {
              50: '#daffff',
              100: '#b1fbfb',
              200: '#85f7f7',
              300: '#58f3f3',
              400: '#31f0f0',
              500: '#1ed7d7',
              600: '#0ca7a7',
              700: '#007777',
              800: '#004949',
              900: '#001a1a'
            }
          }
        }
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
