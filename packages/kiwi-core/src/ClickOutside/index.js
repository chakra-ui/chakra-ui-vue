const ClickOutside = {
  name: 'ClickOutside',
  props: {
    whitelist: Array,
    active: Boolean,
    do: Function
  },
  created () {
    const listener = (e, el) => {
      if (
        e.target === el ||
        el.contains(e.target) ||
        (this.whitelist.includes(e.target) && this.active)
      ) return
      if (this.do) this.do()
    }

    if (this.active) {
      document.addEventListener('click', (e) => listener(e, this.$el))
    }

    this.$once('hook:beforeDestroy', () => {
      if (this.active) {
        document.removeEventListener('click', (e) => listener(e, this.$el))
      }
    })
  },
  render () {
    return this.$slots.default[0]
  }
}

export default ClickOutside
