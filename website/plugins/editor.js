import Vue from 'vue'
import VueLive from 'vue-live'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import LiveEditor from '~/components/LiveEditor.js'
import CodeBlock from '@/components/CodeBlock'

Vue.use(VueLive)
Vue.component(LiveEditor)
Vue.component(CodeBlock)
