<template>
  <div>
    {{ greeting }}
    <Button>Simple text</Button>
  </div>
</template>

<script>
import Button from './components/Button/index'

export default {
  name: 'App',
  components: {
    Button
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
