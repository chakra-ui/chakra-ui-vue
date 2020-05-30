<template>
  <div>
    <CFlex justify="space-between">
      <div>
        <CLink as="router-link" :to="prev">
          {{ prev == '' ? "" : "Prev" }}
        </CLink>
      </div>

      <CLink as="router-link" :to="next">
        {{ next == '' ? "": "Next" }}
      </CLink>
    </CFlex>
  </div>
</template>

<script>
import { CLink, CFlex } from '@chakra-ui/vue'
import { findNextAndPrevRoute } from '../utils'

export default {
  components: {
    CLink,
    CFlex
  },
  data: () => ({
    prev: '',
    next: ''
  }),
  watch: {
    $route (to, from) {
      const { prev, next } = findNextAndPrevRoute(to.path, this.$router.options.routes)

      this.prev = prev
      this.next = next
    }
  },
  created () {
    const { prev, next } = findNextAndPrevRoute(this.$route.path, this.$router.options.routes)

    this.prev = prev
    this.next = next
  }
}
</script>

<style></style>
