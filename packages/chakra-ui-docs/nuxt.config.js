import dotenv from 'dotenv-defaults'
// Configuring dotenv variables.
dotenv.config({
  defaults: '../../config/.env.defaults'
})

export default {
  mode: 'spa',
  head: {
    title: 'Chakra UI Vue | Chakra UI Design system built with Vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple, Modular and Accessible UI Components for your Vue Applications.Built with Styled System.'
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
            loader: '@mdx-js/vue-loader'
          }
        ]
      })
    }
  }
}
