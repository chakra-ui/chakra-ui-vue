import Layout from './live-editor-layout.vue'

export default {
  name: 'LiveEditor',
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
      await navigator.clipboard.writeText(this.text)
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
    const children = this.$slots.default[0]
    const innerText = children.text.trim()
    this.text = innerText
    return h('VueLive', {
      props: {
        code: innerText,
        layout: Layout
      }
    })
  }
}
