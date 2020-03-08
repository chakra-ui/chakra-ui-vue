import dotenv from 'dotenv-defaults'

// Configuring dotenv variables.
dotenv.config({
  defaults: '../../config/.env.defaults'
})


export default {
  mode: 'universal',
  modulesDir: ['../../node_modules'],
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  plugins: [],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/pwa',
  ],
  build: {
    extend(config, ctx) {}
  }
}
