<script>
import 'prismjs'
import PrismEditor from 'vue-prism-editor'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import '../../css/night-owl.css'

import LiveEditor from './live-editor/live-editor.vue'
import { getLanguage } from './utils'
import { CopyTextMixin } from './mixins'

export default {
  name: 'CodeBlock',
  mixins: [CopyTextMixin],
  props: {
    lang: {
      type: String,
      default: 'vue'
    },
    isReadOnly: {
      type: Boolean,
      default: true
    },
    emitEvents: {
      type: Boolean,
      default: false
    },
    lineNumbers: {
      type: Boolean,
      default: false
    },
    autoStyleLineNumbers: {
      type: Boolean,
      default: true
    }
  },
  render (h) {
    const language = getLanguage(this.lang)
    const code = this.$slots.default[0].text
    this.text = code

    if (this.isReadOnly) {
      return h('CBox', {
        attrs: {
          rounded: 'md',
          position: 'relative',
          fontSize: '0.9rem'
        }
      }, [
        h(PrismEditor, {
          props: {
            code,
            language,
            readonly: true,
            ...this.$props
          }
        }),
        h('CButton', {
          props: {
            variantColor: 'vue'
          },
          attrs: {
            position: 'absolute',
            size: 'sm',
            top: '0.2rem',
            right: '0.125rem',
            textTransform: 'uppercase',
            transform: 'scale(0.8)'
          },
          on: {
            click: this.copy
          }
        }, this.copyButtonText)
      ])
    } else {
      const liveEditor = h(LiveEditor, {
        props: { code }
      })

      if (process.browser) {
        return h('client-only', [liveEditor])
      } else {
        return liveEditor
      }
    }
  }
}
</script>
