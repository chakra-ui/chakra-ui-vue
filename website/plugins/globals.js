import Vue from 'vue'
import * as Chakra from '@chakra-ui/vue'
import Lorem from 'vue-lorem-ipsum'
import CarbonAd from '@/components/CarbonAd'

Vue.component('Lorem', Lorem)
Vue.component('CarbonAd', CarbonAd)

Object.keys(Chakra).forEach((key) => {
  if (typeof Chakra[key] === 'object' && Chakra[key].name) {
    Vue.component(Chakra[key].name, Chakra[key])
  }
})
