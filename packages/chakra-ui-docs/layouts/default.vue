<template>
  <div class="container">
    <ThemeProvider>
      <ColorModeProvider>
        <Box font-family="body" as="main">
          <Navbar />
          <CSSReset />
          <Nuxt />
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  </div>
</template>
<script>
import { ThemeProvider, ColorModeProvider, CSSReset, Box } from 'chakra-ui-core'
import Navbar from '../components/Navbar'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    ColorModeProvider,
    CSSReset,
    Box,
    Navbar
  }
}
</script>
