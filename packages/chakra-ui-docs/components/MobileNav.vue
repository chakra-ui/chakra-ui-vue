<template>
  <Fragment>
    <IconButton
      :display="['inline-flex', 'inline-flex', 'none']"
      aria-label="Navigation Menu"
      fontSize="20px"
      variant="ghost"
      icon="bars"
      @click="toggleMenu"
    />
    <Drawer size="xs" :isOpen="isOpen" placement="left" :onClose="handleClose">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody pos="relative" p="0">
          <CloseButton pos="absolute" top="4" right="4" @click="handleClose" />
          <SideNavContent contentHeight="100vh" top="0" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </Fragment>
</template>

<script>
import { Drawer, Fragment, CloseButton, DrawerBody, IconButton, DrawerOverlay, DrawerContent } from 'chakra-ui-core'
import SideNavContent from './SideNavContent'

export default {
  name: 'MobileNav',
  components: {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    IconButton,
    Fragment,
    CloseButton,
    SideNavContent
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    handleClose () {
      this.isOpen = false
    }
  }
}
</script>
