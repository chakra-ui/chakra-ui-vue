import * as icons from './utils/icons'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion'
  ],
  chakra: {
    icons: {
      iconSet: icons
    },
    extendTheme: {
      baseStyles: {
        CAlert: ({ props }) => ({
          rounded: 'full',
          bg: 'white',
          shadow: 'lg',
          transition: '0.1s all ease-in'
        }),
        CAlertTitle: ({ props }) => ({
          color: 'gray.600',
          fontSize: 'sm'
        }),
        CAlertDescription: ({ status }) => {
          const statusMap = {
            info: 'blue.500',
            success: 'green.500',
            warning: 'orange.500',
            error: 'red.500'
          }

          return {
            fontWeight: 'bold',
            fontSize: 'sm',
            color: statusMap[status] || 'gray.500'
          }
        },
        CButton: {
          px: '75px',
          rounded: '30px',
          py: 8
        }
      }
    }
  }
}
