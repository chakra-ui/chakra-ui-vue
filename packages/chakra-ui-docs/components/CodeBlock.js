import { CBox, CButton } from '@chakra-ui/vue'
import PrismEditor from 'vue-prism-editor'

export default {
  name: 'CodeBlock',
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
    },
    code: String
  },
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
      await navigator.clipboard.writeText(this.text)

      // Handle timeouts for copy button text
      if (this.copyTimeout) clearTimeout(this.copyTimeout)
      this.copyButtonText = 'Copied!'
      this.copyTimeout = setTimeout(() => {
        this.copyButtonText = 'Copy'
        clearTimeout(this.copyTimeout)
      }, 1000)
    }
  },
  render (h) {
    // const children = this.$slots.default[0]
    const innerText = this.code.trim()
    this.text = innerText

    return h(CBox, {
      props: {
        rounded: 'md',
        position: 'relative',
        fontSize: '0.9rem'
      }
    }, [
      h(PrismEditor, {
        props: {
          code: innerText,
          language: this.lang,
          readonly: this.isReadOnly,
          ...this.$props
        }
      }),
      h(CButton, {
        props: {
          variantColor: 'vue',
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
  }
}
