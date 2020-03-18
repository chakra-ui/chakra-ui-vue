import dotenv from 'dotenv-defaults'
import rehypePrism from '@mapbox/rehype-prism'

// Configuring dotenv variables.
dotenv.config({
  defaults: '../../config/.env.defaults'
})

export default {
  mode: 'spa',
  generate: {
    routes: [
      './docs/index.vue',
      './docs/getting-started.mdx',
      './docs/principles.mdx',
      './docs/tabs.mdx'
    ]
  },
  hooks: {
    generate: {
      done (page, errors) {
        errors.forEach(error => console.error({ ERROR: error.error }))
      }
    }
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    'plugins/links.js',
    'plugins/editor.js',
    'plugins/chakra-ui.js'
  ],
  css: [
    'css/page.css',
    'css/night-owl.css',
    'css/fonts/fonts.css'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/emotion',
    '@nuxtjs/pwa',
    '@nuxtjs/router'
  ],
  build: {
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          'babel-loader',
          {
            loader: '@mdx-js/vue-loader',
            options: {
              rehypePlugins: [rehypePrism]
            }
          }
        ]
      })
    }
  }
}
