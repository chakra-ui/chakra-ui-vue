import Vue from 'vue'

Vue.component('NuxtLink', {
  render (h) {
    return h('nuxt-link', {
      props: this.$attrs
    }, this.$slots.default)
  }
})

Vue.component('Wrapper', {
  render (h) {
    return h('div', this.$slots.default)
  }
})

Vue.component('InlineCode', {
  render (h) {
    return h('code', this.$slots.default)
  }
})
