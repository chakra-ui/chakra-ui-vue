import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export function createRouter () {
  const components = require.context('@/docs', true, /[\w-]+\.(vue|mdx)$/)
  const keys = components.keys()
  const routes = []

  keys.forEach((fileName) => {
    const componentConfig = components(fileName)
    const [componentName] = fileName
      .split('/')
      .pop()
      .split('.')

    routes.push({
      path: componentName === 'index' ? '/' : `/${componentName}`,
      name: componentName === 'home' ? '/' : componentName,
      component: componentConfig.default
    })
  })

  return new Router({
    mode: 'history',
    routes
  })
}
