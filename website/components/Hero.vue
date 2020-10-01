<template>
  <c-box
    as="header"
    pos="relative"
  >
    <c-flex
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      align-items="center"
      justify-content="center"
    >
      <c-flex
        flex-dir="column"
        :align-items="['flex-start', 'center']"
        justify-content="center"
        :text-align="['left', 'center']"
        w="550px"
      >
        <c-heading as="h1">
          Build Accessible Vue apps with Speed ⚡️
        </c-heading>
        <c-text mt="4" mb="6">
          Chakra UI is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed.
        </c-text>
        <c-flex
          flex-dir="row"
        >
          <c-button
            as="nuxt-link"
            text-decoration="none"
            to="/getting-started"
            left-icon="bolt"
            variant-color="vue"
            size="lg"
          >
            Get started
          </c-button>
          <c-button
            as="a"
            text-decoration="none"
            href="https://github.com/codebender828/kiwi-ui"
            left-icon="github"
            ml="4"
            variant="outline"
            variant-color="vue"
            size="lg"
          >
            Github
          </c-button>
        </c-flex>
        <c-link
          :color="colorMode === 'light' ? 'gray.600' : 'gray.50'"
          mt="4"
          font-size="sm"
          :_hover="{ color : 'vue.400' }"
          is-external
          href="https://chakra-ui.com/"
        >
          Looking for React.js version?
        </c-link>
      </c-flex>
    </c-flex>
  </c-box>
</template>

<script>
import { CFlex, CBox, CHeading, CButton, CText, CLink } from '@chakra-ui/vue'
export default {
  components: {
    CFlex, CBox, CHeading, CButton, CText, CLink
  },
  inject: ['$chakraColorMode'],
  computed: {
    colorMode: vm => vm.$chakraColorMode()
  }
}
</script>
