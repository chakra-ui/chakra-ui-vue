<template>
  <div class="container">
    <c-theme-provider>
      <c-color-mode-provider>
        <c-box font-family="body" as="main">
          <c-reset />
          <Nuxt />
        </c-box>
      </c-color-mode-provider>
    </c-theme-provider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox
  }
}
</script>
