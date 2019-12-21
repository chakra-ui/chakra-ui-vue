<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Slide
          :in="showButton"
        >
          <Box px="6" key="1" py="4" bg="yellow.300">
            <Button key="button" left-icon="check" variant-color="blue">Show Modal</Button>
          </Box>
        </Slide>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Button, Slide, CSSReset, Box } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Button,
    Box,
    CSSReset,
    Slide
  },
  data () {
    return {
      showButton: false,
      from: 'bottom'
    }
  },
  mounted () {
    // setInterval(() => {
    //   this.showButton = !this.showButton
    // }, 5000)
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
