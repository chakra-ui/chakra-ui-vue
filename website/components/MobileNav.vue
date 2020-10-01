<template>
  <c-fragment>
    <c-icon-button
      :display="['inline-flex', 'inline-flex', 'none']"
      aria-label="Navigation Menu"
      font-size="20px"
      variant="ghost"
      icon="bars"
      @click="toggleMenu"
    />
    <c-drawer size="xs" :is-open="isOpen" placement="left" :on-close="handleClose">
      <c-drawer-overlay />
      <c-drawer-content>
        <c-drawer-body pos="relative" p="0" overflow-y="scroll" h="100vh">
          <c-close-button pos="absolute" top="4" right="4" @click="handleClose" />
          <side-nav-content content-height="100vh" top="0" />
        </c-drawer-body>
      </c-drawer-content>
    </c-drawer>
  </c-fragment>
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
