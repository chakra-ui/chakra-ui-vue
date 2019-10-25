<template>
  <theme-provider :theme="theme">
    <PseudoBox
      px="4"
      py="2"
      :as="element ? 'button' : 'section'"
      bg="blue.400"
      color="white"
      :_hover="{
        bg: 'red.200',
        color: 'red.700'
      }"
      @click="toggle"
    >
      I am an anchor
    </PseudoBox>
    <PseudoBox
      px="4"
      py="2"
      as="footer"
      bg="blue.400"
      color="white"
      :_hover="{
        bg: 'red.200',
        color: 'red.700'
      }"
    >
      I am an anchor

    </PseudoBox>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import { Box, PseudoBox } from './lib/core/'
import theme from './lib/theme'

export default {
  data () {
    return {
      theme,
      element: true,
      Box
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    PseudoBox
  },
  methods: {
    toggle () {
      this.element = !this.element
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  font-family: Rubik, sans-serif
}
.top-box {
  margin-bottom: 100px;
}
</style>
