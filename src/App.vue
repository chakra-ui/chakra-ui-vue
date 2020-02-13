<template>
  <theme-provider :theme="$kiwi.theme" :color-mode="colorMode" :icons="$kiwi.icons">
    <main class="root">
      <Heading mb="50px" as="h3">Accordion</Heading>
      <CSSReset />
      <Anchor ref="anchor" is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.700" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <Accordion>
          <KText>Hello Accordion</KText>
        </Accordion>
      </div>
    </main>
  </theme-provider>
</template>

<script lang="js">
import {
  ThemeProvider,
  Heading,
  Link as Anchor,
  Icon,
  CSSReset,
  Accordion,
  Text as KText } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Heading,
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Accordion,
    KText
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60,
      showCollapsed: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.count++
    })
    console.log('mounted', this.$refs)
  },
  methods: {
    logClick () {
      console.log('downloading')
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
  }
}

/* Consumer transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
