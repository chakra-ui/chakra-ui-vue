import Vue from 'vue'
import Router from 'vue-router'
import Home from './docs/index.vue'
import GettingStarted from './docs/getting-started.mdx'
import Principles from './docs/principles.mdx'
import StyleProps from './docs/style-props.mdx'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/getting-started',
        name: 'home',
        component: GettingStarted
      },
      {
        path: '/principles',
        name: 'tabs',
        component: Principles
      },
      {
        path: '/style-props',
        name: 'style-props',
        component: StyleProps
      }
    ]
  })
}
