import { colorModeObserver } from '../utils/color-mode-observer'

const CColorModeProvider = {
  name: 'CColorModeProvider',
  props: {
    value: String
  },
  data () {
    return {
      colorMode: 'light'
    }
  },
  provide () {
    return {
      $colorMode: () => this._colorMode,
      $toggleColorMode: this.toggleColorMode
    }
  },
  computed: {
    _colorMode: {
      get () {
        return this.value ? this.value : this.colorMode
      },
      set (value) {
        this.colorMode = value
      }
    }
  },
  watch: {
    _colorMode: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.colorMode = newVal
      }
    }
  },
  methods: {
    toggleColorMode () {
      this._colorMode = this._colorMode === 'light' ? 'dark' : 'light'
    }
  },
  render () {
    return this.$scopedSlots.default({
      colorMode: this._colorMode,
      toggleColorMode: this.toggleColorMode
    })
  }
}

const CDarkMode = {
  name: 'CDarkMode',
  render (h) {
    return h(CColorModeProvider, {
      props: {
        value: 'dark'
      }
    }, this.$slots.default)
  }
}

const CLightMode = {
  name: 'CLarkMode',
  render (h) {
    return h(CColorModeProvider, {
      props: {
        value: 'light'
      }
    }, this.$slots.default)
  }
}

export default CColorModeProvider

export {
  CDarkMode,
  CLightMode
}
