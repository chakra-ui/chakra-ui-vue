<template>
  <theme-provider :theme="theme" :icons="$kiwi.icons">
    <div class="root">
      <Button variant-color="blue" @click="setLoading" :is-loading="loading"> Button </Button>
    </div>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import { Button } from './lib/core/'
import Badge from './components/Badge'
import theme from './lib/theme'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      theme,
      element: true,
      Badge,
      loading: false
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Button
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
  justify-content: center;
  align-items: center;
}
</style>
