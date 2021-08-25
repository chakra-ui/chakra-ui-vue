import Vue from 'vue'
import * as Chakra from '@chakra-ui/vue'
import Lorem from 'vue-lorem-ipsum'
import CarbonAd from '@/components/CarbonAd'
import { extend, iconSet } from '~/utils/icons'

Vue.use(Chakra.default, {
  icons: {
    iconPack: 'fa',
    iconSet,
    extend
  }
})

Vue.component('Lorem', Lorem)
Vue.component('CarbonAd', CarbonAd)
