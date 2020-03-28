<template>
  <ThemeProvider>
    <ColorModeProvider v-slot="{ colorMode, toggleColorMode }">
      <CBox
        as="main"
        :bg="colorMode === 'light' ? 'white' : 'gray.800'"
        :color="colorMode === 'light' ? 'gray.800' : 'gray.50'"
        class="root"
      >
        <Heading mb="50px" pos="absolute" top="3" left="50%" transform="translateX(-50%)" as="h4">@chakra-ui/vue</Heading>
        <CSSReset />
        <Button
          as="a"
          target="_blank"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          position="fixed"
          top="3"
          left="3"
          shadow="sm"
          left-icon="github"
        >
          Github
        </Button>
        <IconButton
          position="fixed"
          top="3"
          right="3"
          :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`"
          variant="ghost"
          :icon="colorMode === 'light' ? 'sun' : 'moon'"
          @click="toggleColorMode"
        >
        </IconButton>
        <div class="wrapper">
          <slot />
        </div>
      </CBox>
    </ColorModeProvider>
  </ThemeProvider>
</template>

<script>
import {
  ThemeProvider,
  Heading,
  CSSReset,
  Button,
  CBox,
  IconButton,
  ColorModeProvider } from '../../packages/chakra-ui-core/dist/esm'
export default {
  name: 'Canvas',
  components: {
    ThemeProvider,
    Heading,
    CSSReset,
    Button,
    CBox,
    IconButton,
    ColorModeProvider
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  margin: 0
}
.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%
  }
}
</style>