<template>
  <div>
    {{ state.greeting }}
    <Button>{{ state.buttonText }}</Button>
    <Button @click="increment" variant="ghost" color="success" size="lg" > Increment </Button>
    <br>
    <h1>{{ state.count }}</h1>
  </div>
</template>

<script>
import Button from './components/Button'
import { useIncrement } from './use-increment'

export default {
  setup () {
    const { state, increment } = useIncrement()

    return {
      state,
      increment
    }
  },
  name: 'App',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>

</style>
