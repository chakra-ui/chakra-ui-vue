<template>
  <CBox
    as="header"
    pos="relative"
  >
    <CFlex
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      alignItems="center"
      justifyContent="center"
    >
      <CFlex
        flexDir="column"
        :alignItems="['flex-start', 'center']"
        justifyContent="center"
        :textAlign="['left', 'center']"
        w="550px"
      >
        <CHeading as="h1">Build Accessible Vue apps with Speed ⚡️</CHeading>
        <CText mt="4" mb="6">
          Chakra UI is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed.
        </CText>
        <CFlex
          flexDir="row"
        >
          <CButton as="nuxt-link" textDecoration="none" to="/getting-started" left-icon="bolt" variantColor="vue" size="lg">Get started</CButton>
          <CButton as="a" textDecoration="none" href="https://github.com/codebender828/kiwi-ui" left-icon="github" ml="4" variant="outline" variantColor="vue" size="lg">Github</CButton>
        </CFlex>
      </CFlex>
    </CFlex>
  </CBox>
</template>

<script>
import { CFlex, CBox, CHeading, CButton, CText } from '@chakra-ui/vue'
export default {
  components: {
    CFlex,
    CHeading,
    CButton,
    CText,
    CBox
  }
}
</script>
