<template>
  <CBox
    as="nav"
    h="60px"
    px="4"
    d="flex"
    align-items="center"
    shadow="sm"
  >
    <CLink as="nuxt-link" w="130px" to="/" font-weight="bold" font-size="1.2rem">
      <Logo />
    </CLink>
    <CBox
      as="ul"
      :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'"
      d="flex"
      align-items="center"
      list-style-type="none"
      ml="auto"
    >
      <CBox as="li" mr="4">
        <CLink color="gray.500" :_hover="{ color : 'vue.400' }" is-external href="https://github.com/chakra-ui/chakra-ui-vue">
          <CIcon name="github" size="20px" />
        </CLink>
      </CBox>
      <CBox as="li">
        <CIconButton
          variant="ghost"
          variant-color="gray"
          :aria-label="colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          @click="$toggleColorMode"
        />
      </CBox>
      <MobileNav />
    </CBox>
  </CBox>
</template>

<script>
import { CBox, CLink, CIcon, CIconButton } from '@chakra-ui/vue'
import Logo from './Logo.vue'
import MobileNav from './MobileNav.vue'

export default {
  name: 'Navbar',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  components: {
    CBox,
    CLink,
    CIcon,
    Logo,
    CIconButton,
    MobileNav
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  watch: {
    colorMode (newVal) {
      if (!process.client) { return }
      try {
        localStorage.setItem('chakra_ui_docs_color_mode', newVal)
      } catch (error) {
        console.error(error)
      }
    }
  },
  created () {
    if (!process.client) { return }
    try {
      const savedColorMode = localStorage.getItem('chakra_ui_docs_color_mode')
      if (!savedColorMode) { return }

      if (this.colorMode !== savedColorMode) {
        this.$toggleColorMode()
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
