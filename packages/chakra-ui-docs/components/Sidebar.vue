<template>
  <Box
    as="nav"
    p="3"
    :display="['none', null, 'block']"
    maxWidth="18rem"
    width="full"
  >
    <SideNavContent />
  </Box>
</template>

<script>
import { Box } from 'chakra-ui-core'
import SideNavContent from './SideNavContent'

export default {
  name: 'Sidebar',
  components: {
    Box,
    SideNavContent
  }
}
</script>
