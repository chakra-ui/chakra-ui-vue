import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

export default ({ app }) => {
  const MIXPANEL_TOKEN = '91ec73fd1b8e164d6cfbae6bf1a3e7d1'
  try {
    mixpanel.init(MIXPANEL_TOKEN)
    Vue.prototype.$mixpanel = mixpanel
  } catch (error) {
    console.error('Error initializing docs analytics', error)
  }

  app.router.afterEach((to) => {
    try {
      (process.env.NODE_ENV !== 'production') && console.log({ to })
      const { path: page, ...rest } = to
      mixpanel.track('Page View', { page, ...rest })
    } catch (error) {
      console.error(error)
    }
  })
}
