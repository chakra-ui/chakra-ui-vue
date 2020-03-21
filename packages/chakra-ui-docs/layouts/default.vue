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
            <Box
              :class="styles(colorMode)"
              as="section"
              w="100%"
              height="calc(100vh - 60px)"
              overflowY="scroll"
              pt="20"
              :px="[10, 10, 20, '14rem']"
            >
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
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  Css
} from '@chakra-ui/vue'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { css } from 'emotion'

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
  },
  data () {
    return {
      thBg: {
        light: 'gray.50',
        dark: 'whiteAlpha.100'
      },
      callout: {
        light: {
          bg: 'rgb(254, 235, 200)',
          color: 'black',
          borderLeft: '4px solid rgb(221, 107, 32)'
        },
        dark: {
          bg: 'rgba(251, 211, 141, 0.16)',
          color: 'inherit',
          borderLeft: '4px solid rgb(251, 211, 141);'
        }
      }
    }
  },
  computed: {
    styles () {
      return colorMode => css(Css({
        'th': {
          bg: this.thBg[colorMode]
        },
        '.preview-panel': {
          borderColor: this.thBg[colorMode]
        },
        'blockquote': this.callout[colorMode]
      })(this.$kiwi.theme))
    }
  }
}
</script>

<style lang="scss">
@import '../css/components.scss';
</style>
