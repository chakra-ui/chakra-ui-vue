<script>
import copy from 'copy-to-clipboard'
import Layout from './live-editor-layout.vue'

export default {
  name: 'LiveEditor',
  props: {
    code: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      text: undefined,
      copyTimeout: null,
      copyButton: null,
      error: null,
      codeText: undefined
    }
  },
  watch: {
    codeText (newVal, oldVal) {
      if (this.error && (newVal !== oldVal)) {
        this.error = null
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    this.copyButton = this.$el.querySelector('[chakra-copy-button]')
    if (this.copyButton) {
      this.copyButton.addEventListener('click', this.copy)

      this.$on('hook:beforeDestroy', () => {
        this.copyButton.removeEventListener('click', this.copy)
      })
    }

    const codeInput = this.$el.querySelector('pre[contenteditable=true]')
    if (codeInput) {
      this.codeText = codeInput.textContent

      codeInput.addEventListener('input', (e) => {
        this.codeText = e.srcElement.textContent
      })
    }
  },
  methods: {
    async copy () {
      // Copy text to clipboard
      await copy(this.code)
      // Handle timeouts for copy button text
      if (this.copyTimeout) { clearTimeout(this.copyTimeout) }
      this.copyButton.textContent = 'Copied!'
      this.copyTimeout = setTimeout(() => {
        this.copyButton.textContent = 'Copy'
        clearTimeout(this.copyTimeout)
      }, 1000)
    }
  },
  errorCaptured (error, vm, info) {
    this.error = error
    return false
  },
  render (h) {
    const code = this.code
    return h('div', [
      this.error && h('c-alert', {
        props: {
          status: 'error',
          variant: 'solid'
        },
        attrs: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflowX: 'scroll'
        }
      }, [
        h('c-text', {
          attrs: {
            fontWeight: 'bold',
            mb: 3
          }
        }, this.error.message),
        h('c-box', {
          props: { as: 'span' },
          attrs: {
            fontFamily: 'mono',
            fontSize: 'sm',
            whiteSpace: 'line-break'
          }
        }, this.error.stack)
      ]),
      h('VueLive', {
        props: {
          code,
          layout: Layout
        },
        on: {
          error: (error) => {
            console.error('LIVE_CODE_ERROR: ', error)
            this.error = error
          }
        }
      })
    ])
  }
}
</script>
