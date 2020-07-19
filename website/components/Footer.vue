<template>
  <CFlex
    as="footer"
    justify-content="center"
    align-items="center"
    flex-dir="column"
    color="gray.600"
    py="10"
  >
    <CText mb="1" text-align="center">
      Designed and developed by <CLink href="https://twitter.com/codebender828" is-external>
        Jonathan Bakebwa 🇺🇬
      </CLink>
    </CText>
    <c-text mb="4" text-align="center">
      Special thanks goes to these <c-link as="nuxt-link" to="/contributors">
        contributors. 💚
      </c-link>
    </c-text>
    <CStack is-inline spacing="5">
      <CLink
        href="https://twitter.com/codebender828"
        is-external
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
        is-external
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
        is-external
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
        is-external
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
