<template>
  <c-flex
    as="footer"
    justify-content="center"
    align-items="center"
    flex-dir="column"
    color="gray.600"
    py="10"
  >
    <c-text mb="1" text-align="center">
      Designed and developed by <c-link href="https://twitter.com/codebender828" is-external>
        Jonathan Bakebwa 🇺🇬
      </c-link>
    </c-text>
    <c-text mb="4" text-align="center">
      Special thanks goes to these <c-link as="nuxt-link" to="/contributors">
        contributors. 💚
      </c-link>
    </c-text>
    <c-stack is-inline spacing="5">
      <c-link
        href="https://twitter.com/codebender828"
        is-external
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: '#41b883'
        }"
        color="gray.400"
      >
        <c-icon name="twitter" size="20px" />
      </c-link>
      <c-link
        href="https://linkedin.com/in/jbakebwa"
        is-external
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <c-icon name="linkedin" size="20px" />
      </c-link>
      <c-link
        href="mailto:jonas@akkadu-team.com"
        is-external
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <c-icon name="envelope" size="20px" />
      </c-link>
      <c-link
        href="https://jbakebwa.dev"
        is-external
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <c-icon name="globe-africa" size="20px" />
      </c-link>
    </c-stack>
  </c-flex>
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
