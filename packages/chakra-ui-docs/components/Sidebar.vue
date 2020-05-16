<template>
  <CBox
    as="nav"
    p="4"
    :display="['none', null, 'block']"
    max-width="18rem"
    width="full"
    border-right="1px"
    border-color="gray.200"
    h="calc(100vh - 60px)"
    overflow-y="scroll"
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
