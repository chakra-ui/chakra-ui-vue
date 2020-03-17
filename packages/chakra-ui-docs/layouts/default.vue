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
            <Box as="section" d="flex">
              <Sidebar />
              <Box as="main" minH="calc(100vh - 60px)" :w="['auto', 'auto', '100%']">
                <Box as="main" mx="auto" mb="3rem" maxWidth="46rem" pt="8" px="5">
                  <Nuxt />
                  <Footer />
                </Box>
              </Box>
            </Box>
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import { ThemeProvider, ColorModeProvider, CSSReset, Box } from '@chakra-ui/vue'
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
    CSSReset
  }
}
</script>
