<template>
  <theme-provider :theme="theme">
    <div class="root">
      <Icon
        name="star"
        color="yellow.500"
        size="5"
      />
      <Icon
        name="email"
        color="teal.600"
        size="8"
        mr="3"
      />
      <Icon
        name="phone"
        color="indigo.400"
        size="10"
      />
    </div>
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

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
