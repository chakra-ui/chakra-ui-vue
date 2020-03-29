<template>
  <CBox as="nav" h="60px" px="4" d="flex" alignItems="center" shadow="sm">
    <CLink as="nuxt-link" w="130px" to="/" fontWeight="bold" fontSize="1.2rem">
      <Logo />
    </CLink>
    <CBox
      as="ul"
      :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'"
      d="flex"
      alignItems="center"
      listStyleType="none"
      ml="auto"
    >
      <CBox as="li" mr="4">
        <CLink color="gray.500" :_hover="{ color : 'vue.400' }" isExternal href="https://github.com/chakra-ui/chakra-ui-vue"><CIcon name="github" size="20px" /></CLink>
      </CBox>
      <CBox as="li">
        <CIconButton
          @click="$toggleColorMode"
          variant="ghost"
          variantColor="gray"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
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
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  components: {
    CBox,
    CLink,
    CIcon,
    Logo,
    CIconButton,
    MobileNav
  }
}
</script>
