<template>
  <div>
    {{ greeting }}
    <k-button>Simple text</k-button>
  </div>
</template>

<script>
import KButton from './components/Button/index'

export default {
  name: 'App',
  components: {
    KButton
  },
  data () {
    return {
      greeting: 'Hi!'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
