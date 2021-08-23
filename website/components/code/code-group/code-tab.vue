<script>
export default {
  name: 'CodeTab',
  props: {
    label: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      required: false,
      default: null
    },
    live: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
