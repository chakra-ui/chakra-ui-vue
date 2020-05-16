import Vue from 'vue'
import Chakra from '@chakra-ui/vue'

Vue.use(Chakra, <%= JSON.stringify(options, null, 2) %>)
