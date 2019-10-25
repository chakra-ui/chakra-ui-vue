<template>
  <theme-provider :theme="theme">
    <Box
      w="100vw"
      h="100vh"
      m="0"
      d="flex"
      justify-content="center"
      align-items="center"
      bg="gray.100"
    >
      <Button @click="alert">
        I am a button
      </Button>
    </Box>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import { Box, Button } from './lib/core/'
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
    Box,
    Button
  },
  methods: {
    toggle () {
      this.element = !this.element
    },
    alert () {
      alert('clicked')
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
