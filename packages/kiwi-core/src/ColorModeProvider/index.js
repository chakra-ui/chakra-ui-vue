const ColorModeProvider = {
  name: 'ColorModeProvider',
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

const DarkMode = {
  name: 'DarkMode',
  render (h) {
    return h(ColorModeProvider, {
      props: {
        value: 'dark'
      }
    }, this.$slots.default)
  }
}

const LightMode = {
  name: 'LightMode',
  render (h) {
    return h(ColorModeProvider, {
      props: {
        value: 'light'
      }
    }, this.$slots.default)
  }
}

export default ColorModeProvider

export {
  DarkMode,
  LightMode
}
