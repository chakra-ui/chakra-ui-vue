<template>
  <theme-provider :theme="theme" :icons="$kiwi.icons">
    <div class="root">
      <Icon
        name="star"
        color="yellow.500"
        size="6"
        mx="3"
      />
      <Icon
        name="email"
        color="orange.400"
        size="12"
        mx="3"
      />
      <Icon
        name="not-allowed"
        color="red.400"
        size="12"
        mx="3"
      />
      <Icon
        name="chevron-circle-up"
        color="blue.500"
        size="12"
        mx="3"
      />
      <Icon
        name="times-circle"
        color="indigo.300"
        size="24"
        mx="3"
      />
        <Button variant-color="blue" size="lg">Large</Button>
        <Button variant-color="red" size="md">Medium</Button>
        <Button variant-color="blue" size="sm">Small</Button>
    </div>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import { Icon, Button } from './lib/core/'
import Badge from './components/Badge'
import theme from './lib/theme'

export default {
  data () {
    return {
      theme,
      element: true,
      Badge
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Icon,
    Button
  },
  methods: {
    toggle () {
      this.element = !this.element
    },
    alert () {
      console.log('button clicked')
    }
  },
  computed: {
    iconPack () {
      return this.$kiwi.iconPack
    }
  }
}
</script>

<style lang="scss">
html,
body {
  font-family: Rubik, sans-serif;
  margin: 0
}

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
