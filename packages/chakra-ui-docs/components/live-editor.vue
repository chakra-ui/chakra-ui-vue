<script>
import Layout from './live-editor-layout.vue'

export default {
  name: 'LiveEditor',
  render (h) {
    const children = this.$slots.default[0]
    const innerText = children.text.trim()
    return h('VueLive', {
      props: {
        code: innerText,
        layout: Layout
      }
    })
  }
}
</script>
