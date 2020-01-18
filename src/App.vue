<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <Anchor is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.900" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <Button variant-color="blue" ref="anchorEl" @click="showPopper">
          Toggle Popper
        </Button>
        <Popper
          :is-open="show"
          :anchor-el="$refs.anchorEl"
          :on-close="hidePopper"
          :placement="placement"
          :usePortal="usePortal"
          :close-on-click-away="true"
          @popper:open="focus($refs.popperNode)"
          @popper:close="hidePopper"
        >
          <PseudoBox
            as="section"
            :_focus="{
              outline: 'none',
              boxShadow: 'outline'
            }"
            bg="green.300"
            d="flex"
            flex-dir="column"
            p="3"
            w="350px"
            h="100px"
            shadow="lg"
            rounded="md"
            @keydown.esc="hidePopper"
            ref="popperNode"
            focusable
          >
            I am a happy Popper with a very long life to live because I an happy!
            <Button ref="initialFocus" variant-color="indigo" @click="hidePopper">
              Coolio! {{ count }}
            </Button>
            <PopperArrow />
          </PseudoBox>
        </Popper>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Link as Anchor, Icon, PseudoBox, CSSReset, Button, Popper, PopperArrow } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Button,
    Popper,
    PseudoBox,
    PopperArrow
  },
  data () {
    return {
      show: false,
      usePortal: false,
      placement: 'auto',
      count: 0
    }
  },
  methods: {
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    focus (el) {
      this.$nextTick(() => {
        if (el) {
          if (el instanceof HTMLElement) el.focus()
          else if (el.$el) el.$el.focus()
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
  }
}
</style>
