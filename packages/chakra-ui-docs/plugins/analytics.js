import Vue from 'vue'
import VueMultianalytics from 'vue-multianalytics/dist/vue-multianalytics'

export default ({ env, router }) => {
  let mixpanelConfig = {
    token: env.MIXPANEL_TOKEN
  }

  try {
    Vue.use(VueMultianalytics, {
      modules: {
        mixpanel: mixpanelConfig
      },
      routing: {
        vueRouter: router,
        preferredProperty: 'name',
        ignoredViews: ['Home'],
        ignoredModules: ['ga']
      }
    })
  } catch (error) {
    console.error('Error loading analytics token', error)
  }
}
