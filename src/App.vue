<template>
  <theme-provider :theme="$kiwi.theme" :color-mode="colorMode" :icons="$kiwi.icons">
    <main class="root">
      <Heading mb="50px" as="h1">Chakra-vui Circular Progress</Heading>
      <CSSReset />
      <Anchor is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.900" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <CircularProgress color="tomato" :value="value">
          <CircularProgressLabel>{{ value }}%</CircularProgressLabel>
        </CircularProgress>
        <Button variant-color="blue" left-icon="coffee"> Nice Button </Button>
      </div>
    </main>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Heading, Link as Anchor, Button, CircularProgress, CircularProgressLabel, Icon, CSSReset } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Heading,
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Button,
    CircularProgress,
    CircularProgressLabel
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60
    }
  },
  methods: {
    logClick () {
      this.value = 0
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(() => {
        let internalValue = this.value
        internalValue = internalValue + parseInt((Math.random() * 10).toFixed(0), 10)
        if (internalValue >= 100) {
          internalValue = 100
          this.value = internalValue
          clearInterval(this.interval)
        }
        this.value = internalValue
      }, 1000)
    },
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    showPopper2 () {
      this.show2 = !this.show2
    },
    hidePopper2 () {
      this.show2 = false
    },
    focus (el) {
      setTimeout(() => {
        if (el) {
          if (el instanceof HTMLElement) el.focus()
          else if (el.$el && el.$el.focus) el.$el.focus()
        }
      })
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
    /* display: flex; */
    /* flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px; */
  }
}
</style>
