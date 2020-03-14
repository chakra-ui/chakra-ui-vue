import Vue from 'vue'
import Router from 'vue-router'
import Index from './docs/index.mdx'
import Tabs from './docs/tabs.mdx'
import Home from './pages/index.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        name: '_home',
        component: Home
      },
      {
        path: '/',
        name: 'home',
        component: Index
      },
      {
        path: '/tabs',
        name: 'tabs',
        component: Tabs
      }
    ]
  })
}
