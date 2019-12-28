<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Anchor href="https://chakra-ui.com" variant="nice-bg">
          Docs
        </Anchor>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Link as Anchor, CSSReset } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    // Button,
    Anchor,
    CSSReset
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    open (params) {
      this.isOpen = true
    },
    close (params) {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
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

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
