<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Button left-icon="coffee" mb="3" variant-color="indigo" @click="open">Show Modal</Button>
        <Drawer
          :is-open="isOpen"
          :on-close="close"
          placement="right"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr="3" @click="close">
                Cancel
              </Button>
              <Button variant-color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Drawer, DrawerContent, DrawerOverlay, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter, Button, CSSReset } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Button,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerBody,
    DrawerHeader,
    DrawerFooter,
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
