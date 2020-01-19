<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <Anchor is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.900" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <Tooltip :show-delay="500" placement="top" :hide-delay="500" label="Hey, I'm here!">
          Top
        </Tooltip>
        <Tooltip :show-delay="500" placement="right" :hide-delay="500" label="Hey, I'm here!">
          Right
        </Tooltip>
        <Tooltip :show-delay="500" placement="bottom" :hide-delay="500" label="Hey, I'm here!">
          Bottom
        </Tooltip>
        <Tooltip :show-delay="500" placement="left" :hide-delay="500" label="Hey, I'm here!">
          Left
        </Tooltip>
        <Tooltip :show-delay="500" placement="top-start" :hide-delay="500" label="Hey, I'm here!">
          Top Start
        </Tooltip>
        <Tooltip :show-delay="500" placement="auto-end" :hide-delay="500" label="Hey, I'm here!">
          Auto End
        </Tooltip>
        <Tooltip :show-delay="500" placement="left-start" :hide-delay="500" label="Hey, I'm here!">
          Left Start
        </Tooltip>
        <Tooltip :show-delay="500" placement="right-end" :hide-delay="500" label="Hey, I'm here!">
          Right End
        </Tooltip>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Link as Anchor, Icon, Tooltip, CSSReset } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Tooltip
  },
  data () {
    return {
      show: false,
      usePortal: true,
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
  }
}
</style>
