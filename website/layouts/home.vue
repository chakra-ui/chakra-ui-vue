<template>
  <div class="container">
    <client-only>
      <vue-skip-to to="#main-content" label="Skip to main content" />
    </client-only>
    <c-theme-provider>
      <c-color-mode-provider v-slot="{ colorMode }">
        <c-box
          font-family="body"
          as="main"
          :bg="colorMode === 'light' ? 'white' : 'gray.800'"
          :color="colorMode === 'light' ? 'black' : 'whiteAlpha.900'"
        >
          <c-reset />
          <navbar />
          <c-box as="main" :px="[4, 10, '12rem']">
            <nuxt />
          </c-box>
        </c-box>
      </c-color-mode-provider>
    </c-theme-provider>
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
