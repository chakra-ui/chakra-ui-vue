import dotenv from 'dotenv-defaults'
// Configuring dotenv variables.
dotenv.config({
  defaults: '../../config/.env.defaults'
})

export default {
  mode: 'universal',
  head: {
    title: 'Chakra UI Vue | Simple, Modular and Accessible UI Components for your Vue Applications.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
  build: {
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
