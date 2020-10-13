import copy from 'copy-to-clipboard'

export const CopyTextMixin = {
  data () {
    return {
      text: undefined,
      copyTimeout: null,
      copyButtonText: 'Copy'
    }
  },
  methods: {
    async copy () {
      // Copy text to clipboard
      await copy(this.text)

      // Handle timeouts for copy button text
      this.copyTimeout && clearTimeout(this.copyTimeout)

      this.copyButtonText = 'Copied!'
      this.copyTimeout = setTimeout(() => {
        this.copyButtonText = 'Copy'
        clearTimeout(this.copyTimeout)
      }, 1000)
    }
  }
}
