<template>
  <CBox
    as="nav"
    p="4"
    :display="['none', null, 'block']"
    maxWidth="18rem"
    width="full"
    borderRight="1px"
    borderColor="gray.200"
    h="calc(100vh - 60px)"
    overflowY="scroll"
  >
    <SideNavContent />
  </CBox>
</template>

<script>
import { CBox } from '@chakra-ui/vue'
import SideNavContent from './SideNavContent'

export default {
  name: 'Sidebar',
  components: {
    CBox,
    SideNavContent
  }
}
</script>
