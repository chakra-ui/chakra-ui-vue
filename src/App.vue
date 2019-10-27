<template>
  <theme-provider :theme="theme">
    <Icon
      name="star"
      color="yellow.500"
      size="5"
    >

    </Icon>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import { Icon } from './lib/core/'
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
    Icon
  },
  methods: {
    toggle () {
      this.element = !this.element
    },
    alert () {
      console.log('button clicked')
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
</style>
