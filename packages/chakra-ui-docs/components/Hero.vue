<template>
  <CBox
    as="header"
    pos="relative"
  >
    <CFlex
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      align-items="center"
      justify-content="center"
    >
      <CFlex
        flex-dir="column"
        :align-items="['flex-start', 'center']"
        justify-content="center"
        :text-align="['left', 'center']"
        w="550px"
      >
        <CHeading as="h1">
          Build Accessible Vue apps with Speed ⚡️
        </CHeading>
        <CText mt="4" mb="6">
          Chakra UI is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed.
        </CText>
        <CFlex
          flex-dir="row"
        >
          <CButton
            text-decoration="none"
            to="/getting-started"
            left-icon="bolt"
            variant-color="vue"
            size="lg"
            as="nuxt-link"
          >
            Get started
          </CButton>
          <CButton
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
          </CButton>
        </CFlex>
        <CLink
          color="gray.600"
          mt="4"
          font-size="sm"
          :_hover="{ color : 'vue.400' }"
          is-external
          href="https://chakra-ui.com/"
        >
          Looking for React.js version?
        </CLink>
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
