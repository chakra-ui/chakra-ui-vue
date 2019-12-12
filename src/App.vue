<template>
  <theme-provider :theme="$kiwi.theme" :colorMode="colorMode" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Button left-icon="star" mb="3" variant-color="blue" @click="enableTrap" variant="outline">Enable focus trap</Button>
        <FocusTrap initial-focus="#favourite" return-focus-on-deactivate :active="active">
          <ButtonGroup variant-color="indigo" is-attached>
            <Button id="favourite" left-icon="star" variant="outline">Favourite</Button>
            <Button left-icon="search">Search</Button>
            <Button left-icon="not-allowed" variant="outline" @click="disableTrap">Disable Trap</Button>
          </ButtonGroup>
        </FocusTrap>
        <Modal :is-open="openValue">
          Modal Content
        </Modal>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { FocusTrap } from 'focus-trap-vue'
import { ThemeProvider, Button, ButtonGroup, Modal } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Button,
    ButtonGroup,
    FocusTrap,
    Modal
  },
  data () {
    return {
      value: 0,
      shouldActivateTrap: false,
      lastFocusElement: null,
      openValue: true,
      colorMode: 'light'
    }
  },
  computed: {
    active () {
      return this.shouldActivateTrap
    }
  },
  methods: {
    enableTrap () {
      this.shouldActivateTrap = true
    },
    disableTrap () {
      this.shouldActivateTrap = false
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
