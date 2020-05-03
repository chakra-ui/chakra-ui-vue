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
      copyButton: null
    }
  },
  mounted () {
    this.copyButton = this.$el.querySelector('[chakra-copy-button]')
    if (!this.copyButton) return
    this.copyButton.addEventListener('click', this.copy)

    this.$on('hook:beforeDestroy', () => {
      this.copyButton.removeEventListener('click', this.copy)
    })
  },
  methods: {
    async copy () {
      // Copy text to clipboard
      await navigator.clipboard.writeText(this.code)
      // Handle timeouts for copy button text
      if (this.copyTimeout) clearTimeout(this.copyTimeout)
      this.copyButton.textContent = 'Copied!'
      this.copyTimeout = setTimeout(() => {
        this.copyButton.textContent = 'Copy'
        clearTimeout(this.copyTimeout)
      }, 1000)
    }
  },
  render (h) {
    const code = this.code
    return h('VueLive', {
      props: {
        code,
        layout: Layout
      }
    })
  }
}

export default LiveEditor
