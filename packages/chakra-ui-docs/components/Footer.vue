<template>
  <CFlex
    as="footer"
    justifyContent="center"
    alignItems="center"
    flexDir="column"
    color="gray.600"
    py="10"
  >
    <CText mb="4">Designed and developed by <CLink href="https://twitter.com/codebender828" isExternal>Jonathan Bakebwa</CLink></CText>
    <CStack isInline spacing="5">
      <CLink
        href="https://twitter.com/codebender828"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: '#41b883'
        }"
        color="gray.400"
      >
        <CIcon name="twitter" size="20px" />
      </CLink>
      <CLink
        href="https://linkedin.com/in/jbakebwa"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <CIcon name="linkedin" size="20px" />
      </CLink>
      <CLink
        href="mailto:jonas@akkadu-team.com"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <CIcon name="envelope" size="20px" />
      </CLink>
      <CLink
        href="https://jbakebwa.dev"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <CIcon name="globe-africa" size="20px" />
      </CLink>
    </CStack>
  </CFlex>
</template>

<script>
import { CFlex, CText, CLink, CIcon, CStack } from '@chakra-ui/vue'

export default {
  name: 'Footer',
  components: {
    CFlex,
    CText,
    CLink,
    CIcon,
    CStack
  }
}
</script>
