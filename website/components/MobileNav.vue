<template>
  <CFragment>
    <CIconButton
      :display="['inline-flex', 'inline-flex', 'none']"
      aria-label="Navigation Menu"
      font-size="20px"
      variant="ghost"
      icon="bars"
      @click="toggleMenu"
    />
    <CDrawer size="xs" :is-open="isOpen" placement="left" :on-close="handleClose">
      <CDrawerOverlay />
      <CDrawerContent>
        <CDrawerBody pos="relative" p="0" overflow-y="scroll" h="100vh">
          <CCloseButton pos="absolute" top="4" right="4" @click="handleClose" />
          <SideNavContent content-height="100vh" top="0" />
        </CDrawerBody>
      </CDrawerContent>
    </CDrawer>
  </CFragment>
</template>

<script>
import { CDrawer, CFragment, CCloseButton, CDrawerBody, CIconButton, CDrawerOverlay, CDrawerContent } from '@chakra-ui/vue'
import SideNavContent from './SideNavContent'

export default {
  name: 'MobileNav',
  components: {
    CDrawer,
    CDrawerBody,
    CDrawerOverlay,
    CDrawerContent,
    CIconButton,
    CFragment,
    CCloseButton,
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
