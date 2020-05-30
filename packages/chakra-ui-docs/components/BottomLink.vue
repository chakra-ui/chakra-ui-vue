<template>
  <div>
    <CFlex justify="space-between">
      <div>
        <CLink as="router-link" :to="prevPath">
          <CIcon v-show="prevName" name="chevron-left" />
          {{ prevName == '' ? "" : prevName }}
        </CLink>
      </div>

      <CLink as="router-link" :to="nextPath">
        {{ nextName == '' ? "" : nextName }}
        <CIcon v-show="nextName" name="chevron-right" />
      </CLink>
    </CFlex>
  </div>
</template>

<script>
import { CLink, CFlex, CIcon } from '@chakra-ui/vue'
import { findNextAndPrevRoute } from '../utils'

export default {
  components: {
    CLink,
    CFlex,
    CIcon
  },
  data: () => ({
    prevPath: '',
    prevName: '',
    nextPath: '',
    nextName: ''
  }),
  watch: {
    '$route.path' (nextPath) {
      const { prev, next } = findNextAndPrevRoute(nextPath)

      this.prevPath = prev.path
      this.prevName = prev.name
      this.nextPath = next.path
      this.nextName = next.name
    }
  },
  created () {
    const { prev, next } = findNextAndPrevRoute(this.$route.path)

    this.prevPath = prev.path
    this.prevName = prev.name
    this.nextPath = next.path
    this.nextName = next.name
  }
}
</script>

<style></style>
