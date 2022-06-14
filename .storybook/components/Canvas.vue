<template>
  <CThemeProvider>
    <CColorModeProvider v-slot="{ colorMode, toggleColorMode }">
      <CBox
        as="main"
        :bg="colorMode === 'light' ? 'white' : 'gray.800'"
        :color="colorMode === 'light' ? 'gray.800' : 'gray.50'"
        class="root"
        width="100vw"
        height="100vh"
        transition="all 0.2s ease-in-out"
      >
        <CFlex justify-content="space-between" padding="4">
          <CHeading mb="50px" as="h4">@chakra-ui/vue</CHeading>
          <CReset />
          <CButton
            as="a"
            target="_blank"
            href="https://github.com/chakra-ui/chakra-ui-vue"
            shadow="sm"
            left-icon="github"
            order="-1"
          >
            Github
          </CButton>
          <CIconButton
            :aria-label="
              `Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`
            "
            variant="solid"
            :icon="colorMode === 'light' ? 'sun' : 'moon'"
            @click="toggleColorMode"
          >
          </CIconButton>
        </CFlex>
        <CFlex
          class="wrapper"
          flex-direction="column"
          justify-content="center"
          align-items="center"
        >
          <slot />
        </CFlex>
      </CBox>
    </CColorModeProvider>
  </CThemeProvider>
</template>

<script>
import {
  CThemeProvider,
  CHeading,
  CReset,
  CButton,
  CBox,
  CFlex,
  CIconButton,
  CColorModeProvider
} from '../../packages/chakra-ui-core/src'

export default {
  name: 'Canvas',
  components: {
    CThemeProvider,
    CHeading,
    CReset,
    CButton,
    CBox,
    CFlex,
    CIconButton,
    CColorModeProvider
  }
}
</script>
