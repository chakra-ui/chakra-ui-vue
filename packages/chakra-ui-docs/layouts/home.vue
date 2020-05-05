<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider v-slot="{ colorMode }">
        <CBox
          font-family="body"
          as="main"
          :bg="colorMode === 'light' ? 'white' : 'gray.800'"
          :color="colorMode === 'light' ? 'black' : 'whiteAlpha.900'"
        >
          <CReset />
          <Navbar />
          <CBox px="12rem">
            <Nuxt />
          </CBox>
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import { CThemeProvider, CColorModeProvider, CBox, CReset } from '@chakra-ui/vue'
import Navbar from '../components/Navbar'

export default {
  name: 'HomeLayout',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CBox,
    Navbar,
    CReset
  }
}
</script>
