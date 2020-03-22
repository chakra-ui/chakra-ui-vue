<template>
  <Flex
    as="footer"
    justifyContent="center"
    alignItems="center"
    flexDir="column"
    color="gray.600"
    py="10"
  >
    <CText mb="4">Designed and developed by <Anchor href="https://twitter.com/codebender828" isExternal>Jonathan Bakebwa</Anchor></CText>
    <Stack isInline spacing="5">
      <Anchor
        href="https://twitter.com/codebender828"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: '#41b883'
        }"
        color="gray.400"
      >
        <Icon name="twitter" size="20px" />
      </Anchor>
      <Anchor
        href="https://linkedin.com/in/jbakebwa"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <Icon name="linkedin" size="20px" />
      </Anchor>
      <Anchor
        href="mailto:jonas@akkadu-team.com"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <Icon name="envelope" size="20px" />
      </Anchor>
      <Anchor
        href="https://jbakebwa.dev"
        isExternal
        transition="color 0.2s ease-in-out"
        :_hover="{
          color: 'vue.500'
        }"
        color="gray.400"
      >
        <Icon name="globe-africa" size="20px" />
      </Anchor>
    </Stack>
  </Flex>
</template>

<script>
import { Flex, Text as CText, Link as Anchor, Icon, Stack } from '@chakra-ui/vue'

export default {
  name: 'Footer',
  components: {
    Flex,
    CText,
    Anchor,
    Icon,
    Stack
  }
}
</script>
