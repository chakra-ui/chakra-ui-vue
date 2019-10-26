<template>
  <theme-provider :theme="theme">
    <Box
      w="100vw"
      h="100vh"
      m="0"
      d="flex"
      justify-content="center"
      align-items="center"
      bg="gray.50"
    >
      <Button mx="3" variant-color="blue">Solid</Button>
      <Button variant="outline" mx="3" variant-color="blue">Outlined</Button>
      <Button variant="ghost" mx="3" variant-color="blue">Ghost</Button>
      <Button variant="flat" mx="3" variant-color="blue">Flat</Button>
      <Button variant="link" mx="3" variant-color="blue">Link</Button>
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
