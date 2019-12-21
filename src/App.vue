<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Drawer
          :is-open="isOpen"
          placement="left"
          :on-close="dismissModal"
        >
          <DrawerContent>
            Hello
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, CSSReset, Drawer, DrawerContent } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Drawer,
    DrawerContent,
    CSSReset
  },
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    modalClosed (params) {
      console.log('MODAL: Closed', params)
    },
    showModal (params) {
      this.isOpen = true
    },
    dismissModal (params) {
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
