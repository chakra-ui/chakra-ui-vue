import dotenv from 'dotenv-defaults'
import { stringToUrl } from './utils'
import pages from './utils/all-routes'

const routes = pages
  .map(page => {
    return page === 'Index' ? stringToUrl('') : stringToUrl(page)
  })

// Configuring dotenv variables.
dotenv.config({
  path: '../../config/.env',
  defaults: '../../config/.env.defaults'
})

export default {
  mode: 'universal',
  srcDir: __dirname,
  generate: {
    routes
  },
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
  env: {
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN
  },
  loading: { color: '#fff' },
  plugins: [
    { src: 'plugins/analytics.js', ssr: false },
    'plugins/links.js',
    'plugins/editor.js',
    'plugins/chakra-ui.js',
    'plugins/vue-meta.js'
  ],
  css: [
    'css/page.css',
    'css/fonts/fonts.css'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    ['@nuxtjs/emotion', {
      ssr: 'critical'
    }],
    '@nuxtjs/pwa',
    '@nuxtjs/router'
  ],
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
    }
  },
  build: {
    transpile: [
      'vue-lorem-ipsum',
      '@chakra-ui/theme-vue'
    ],
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          'babel-loader',
          'mdx-vue-loader'
        ]
      })
    }
  }
}
