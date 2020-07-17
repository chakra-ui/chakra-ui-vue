import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

export default ({ app, env }) => {
  try {
    mixpanel.init(env.MIXPANEL_TOKEN)
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
