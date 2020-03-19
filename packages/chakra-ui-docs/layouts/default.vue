<template>
  <div class="container">
    <ThemeProvider>
      <ColorModeProvider v-slot="{ colorMode }">
        <Box
          font-family="body"
          :bg="colorMode === 'light' ? 'white' : 'gray.800'"
          :color="colorMode === 'light' ? 'black' : 'whiteAlpha.900'"
        >
        <CSSReset />
        <Navbar />
        <Flex maxH="calc(100vh - 60px)">
          <Sidebar />
          <Box as="section" w="100%" height="calc(100vh - 60px)" overflowY="scroll" pt="8" :px="[10, 10, 24]">
            <Nuxt />
            <Footer />
          </Box>
        </Flex>
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  </div>
</template>
<script>
import { ThemeProvider, ColorModeProvider, CSSReset, Box, Flex } from '@chakra-ui/vue'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    ThemeProvider,
    ColorModeProvider,
    Box,
    Navbar,
    Sidebar,
    Footer,
    CSSReset,
    Flex
  }
}
</script>
