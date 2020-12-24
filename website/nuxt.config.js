import dotenv from 'dotenv-defaults'
import { createServerDirective } from '@chakra-ui/vue/src/directives'
import { defaultTheme } from '@chakra-ui/vue'

// Configuring dotenv variables.
dotenv.config({
  path: '../../config/.env',
  defaults: '../../config/.env.defaults'
})

export default {
  mode: 'universal',
  options: {
    target: 'static'
  },
  srcDir: __dirname,
  head: {
    title: 'Chakra UI Vue | Simple, Modular and Accessible UI Components for your Vue Applications.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Simple, Modular and Accessible UI Components for your Vue Applications. Built with Styled System.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    'plugins/links.js',
    'plugins/editor.js',
    'plugins/chakra-ui.js',
    'plugins/vue-meta.js',
    'plugins/skip-to.js'
  ],
  css: [
    'css/page.css'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    'modules/routes',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    '@nuxtjs/emotion',
    '@nuxtjs/pwa'
  ],
  router: {
    prefetchLinks: true
  },
  pwa: {
    meta: {
      name: 'Chakra UI Vue',
      description: 'Build accessible Vue applications with speed ⚡️',
      theme_color: '#3ea76a',
      author: 'Jonathan Bakebwa <codebender828@gmail.com> https://jbakebwa.dev'
    },
    icon: {
      iconSrc: 'static/chakra.png',
      iconFileName: 'chakra.png'
    },
    manifest: {
      name: 'Chakra UI Vue',
      short_name: 'Build accessible Vue applications with speed ⚡️',
      lang: 'en'
    }
  },
  extensions: [
    'mdx'
  ],
  render: {
    bundleRenderer: {
      directives: {
        chakra: createServerDirective(defaultTheme)
      }
    }
  },
  build: {
    transpile: [
      'vue-lorem-ipsum',
      '@chakra-ui/vue',
      '@chakra-ui/theme-vue'
    ],
    additionalExtensions: [
      '.mdx'
    ],
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  },
  googleAnalytics: {
    id: 'G-D771874GK6'
  }
}
