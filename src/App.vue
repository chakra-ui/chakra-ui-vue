<template>
  <theme-provider :theme="theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Badge mx="2">Default</Badge>
        <Badge mx="2" variant-color="green">Success</Badge>
        <Badge mx="2" variant-color="red">Removed</Badge>
        <Badge mx="2" variant-color="indigo">New</Badge>
      </div>
    </div>
  </theme-provider>
</template>

<script>
import { ThemeProvider, Badge } from './lib/core/'
import theme from './lib/theme'

export default {
  data () {
    return {
      theme,
      element: true,
      loading: false
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Badge
  },
  methods: {
    toggle () {
      this.element = !this.element
    },
    setLoading () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
