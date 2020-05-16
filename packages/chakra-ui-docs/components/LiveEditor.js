import copy from 'copy-to-clipboard'
import Layout from './live-editor-layout.vue'

const LiveEditor = {
  name: 'LiveEditor',
  props: {
    code: String
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
  watch: {
    codeText (newVal, oldVal) {
      if (this.error && (newVal !== oldVal)) {
        this.error = null
      }
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
        }
      }, this.error.message),
      h('VueLive', {
        props: {
          code,
          layout: Layout
        },
        on: {
          error: (error) => {
            console.info('FANCY_ERROR', error)
            this.error = error
          }
        }
      })
    ])
  }
}

export default LiveEditor
