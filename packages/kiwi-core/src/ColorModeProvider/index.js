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

// TODO: Use composition API hooks.
const inject = (val) => val
const computed = (val) => val

function useColorMode () {
  const $colorMode = inject('$colorMode')
  const colorMode = computed(() => $colorMode())
  const toggleColorMode = inject('$toggleColorMode')
  return {
    colorMode,
    toggleColorMode
  }
}

export default ColorModeProvider

export {
  useColorMode,
  DarkMode,
  LightMode
}
