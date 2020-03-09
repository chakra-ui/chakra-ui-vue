<template>
  <Box as="nav" h="60px" px="4" d="flex" alignItems="center" shadow="sm">
    <Anchor fontWeight="bold" fontSize="1.2rem">
      chakra-ui/vue
    </Anchor>
    <Box as="ul" ml="auto">
      <Icon name="github" :size="['30px', '25px', '20px']" />
    </Box>
  </Box>
</template>

<script>
import { Box, Link as Anchor, Icon } from 'chakra-ui-core'

export default {
  name: 'Navbar',
  components: {
    Box,
    Anchor,
    Icon
  }
}
</script>
