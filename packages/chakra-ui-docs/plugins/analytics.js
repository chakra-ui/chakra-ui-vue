import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN

mixpanel.init(MIXPANEL_TOKEN)

export default ({ app }) => {
  Vue.prototype.$mixpanel = mixpanel

  app.router.afterEach(to => {
    try {
      (process.env.NODE_ENV !== 'production') && console.log({ to })
      const { path: page, ...rest } = to
      mixpanel.track('Page View', { page, ...rest })
    } catch (error) {
      console.error(error)
    }
  })
}
