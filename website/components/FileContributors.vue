<template>
  <CBox
    pt="10"
    pb="20"
  >
    <CHeading as="h3" font-size="xl">
      ❤️  Contribute to this page
    </CHeading>
    <CText my="4">
      Caught a mistake or want to contribute to the documentation? <CLink :href="`https://github.com/chakra-ui/chakra-ui-vue/blob/master/${filePath}`">
        Edit this page on GitHub!
      </CLink>
    </CText>
  </CBox>
</template>

<script>

import { CBox, CLink, CHeading, CText } from '@chakra-ui/vue'

export default {
  name: 'FileContributors',
  components: {
    CBox,
    CLink,
    CHeading,
    CText
  },
  computed: {
    fileRoute () {
      return this.$route.path
    },
    filePath () {
      return `website/pages${this.fileRoute}.mdx`
    }
  }
}
</script>
