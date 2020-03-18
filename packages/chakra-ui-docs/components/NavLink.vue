
<script>
import { PseudoBox } from '@chakra-ui/vue'

export default {
  extends: PseudoBox,
  computed: {
    isActive () {
      return this.$el.classList.contains('router-link-exact-active')
    }
  }
}
</script>
