import Vue from 'vue'
import Router from 'vue-router'
import Index from './docs/index.mdx'
import Tabs from './docs/tabs.mdx'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/tabs',
        component: Tabs
      }
    ]
  })
}
