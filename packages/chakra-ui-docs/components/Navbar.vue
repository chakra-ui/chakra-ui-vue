<template>
  <Box as="nav" h="60px" px="4" d="flex" alignItems="center" shadow="sm">
    <Anchor as="nuxt-link" w="130px" to="/" fontWeight="bold" fontSize="1.2rem">
      <Logo />
    </Anchor>
    <Box
      as="ul"
      :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'"
      d="flex"
      alignItems="center"
      listStyleType="none"
      ml="auto"
    >
      <Box as="li" mr="4">
        <Anchor color="gray.500" :_hover="{ color : 'vue.400' }" isExternal href="https://github.com/chakra-ui/chakra-ui-vue"><Icon name="github" size="20px" /></Anchor>
      </Box>
      <Box as="li">
        <IconButton
          @click="$toggleColorMode"
          variant="ghost"
          variantColor="gray"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
        />
      </Box>
      <MobileNav />
    </Box>
  </Box>
</template>

<script>
import { Box, Link as Anchor, Icon, IconButton } from '@chakra-ui/vue'
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
    Box,
    Anchor,
    Icon,
    Logo,
    IconButton,
    MobileNav
  }
}
</script>
