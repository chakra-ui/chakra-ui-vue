import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

export default ({ env, app }) => {
  try {
    mixpanel.init(env.MIXPANEL_TOKEN)

    Vue.prototype.$mixpanel = mixpanel

    app.router.afterEach(to => {
      (process.env.NODE_ENV !== 'production') && console.log({ to })
      const { path: page, ...rest } = to

      mixpanel.track('Page View', { page, ...rest })
    })
  } catch (error) {
    console.error('Error loading analytics token', error)
  }
}
