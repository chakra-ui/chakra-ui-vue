<template>
  <Box as="nav" h="60px" px="4" d="flex" alignItems="center" shadow="sm">
    <Anchor w="130px" href="/" fontWeight="bold" fontSize="1.2rem">
      <Logo />
    </Anchor>
    <Box as="ul" :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'" d="flex" alignItems="center" listStyleType="none" ml="auto">
      <Box as="li" mr="4">
        <Icon name="github" size="20px" />
      </Box>
      <Box as="li">
        <IconButton @click="$toggleColorMode" variant="ghost" variantColor="gray" :icon="colorMode === 'light' ? 'moon' : 'sun'" />
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
  inject: ['$colorMode', '$toggleColorMode'],
  computed: {
    colorMode () {
      return this.$colorMode()
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
