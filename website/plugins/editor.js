import Vue from 'vue'
import VueLive from 'vue-live'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import { CodeBlock, LiveEditor } from '~/components/code'

Vue.use(VueLive)
Vue.component(LiveEditor)
Vue.component(CodeBlock)
