<template>
  <Box
    pt="10"
    pb="20"
  >
    <Heading as="h3" fontSize="xl">
      😍 Contributors
    </Heading>
    <CText my="4">
      Caught a mistake or want to contribute to the documentation? <Anchor :href="`https://github.com/chakra-ui/chakra-ui-vue/blob/master/${filePath}`">Edit this page on GitHub!</Anchor>
    </CText>
    <Anchor
      v-for="(contributor, index) in contributors"
      :key="index"
      :href="`https://github.com/${contributor.login}`"
      isExternal
    >
      <Tag rounded="full" m="1" variantColor="gray">
        <Avatar
          :name="contributor.login"
          size="xs"
          :src="contributor.avatar_url"
          :ml="-2"
          :mr="2"
        />
        <TagLabel>{{ contributor.login }}</TagLabel>
      </Tag>
    </Anchor>
  </Box>
</template>

<script>
// eslint-disable-next-line
import getFileContributors from 'file-contributors'
import { Box, Link as Anchor, Tag, Avatar, TagLabel, Heading, Text as CText } from '@chakra-ui/vue'

export default {
  name: 'FileContributors',
  components: {
    Box,
    Anchor,
    Tag,
    Avatar,
    TagLabel,
    Heading,
    CText
  },
  data () {
    return {
      contributors: undefined
    }
  },
  computed: {
    fileRoute () {
      return this.$route.path
    },
    filePath () {
      return `packages/chakra-ui-docs/docs${this.fileRoute}.mdx`
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (newVal, oldVal) {
        this.contributors = undefined
        if (newVal === '/index') return
        if (newVal !== oldVal) this.getContributors()
      }
    }
  },
  methods: {
    async getContributors () {
      try {
        this.contributors = await getFileContributors(
          'chakra-ui',
          'chakra-ui-vue',
          this.filePath
        )
      } catch (e) {
        console.error(`Error fetching contributors for file ${this.filePath}`, e)
      }
    }
  }
}
</script>
