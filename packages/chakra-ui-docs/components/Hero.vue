<template>
  <Box
    as="header"
    pos="relative"
  >
    <Flex
      :px="[8, 8]"
      :py="10"
      :h="['auto', 'auto', '60vh']"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDir="column"
        :alignItems="['flex-start', 'center']"
        justifyContent="center"
        :textAlign="['left', 'center']"
        w="550px"
      >
        <Heading as="h1">Build Accessible Vue apps with Speed ⚡️</Heading>
        <KText mt="4" mb="6">
          Chakra UI is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed.
        </KText>
        <Flex
          flexDir="row"
        >
          <Button as="nuxt-link" to="/getting-started" left-icon="bolt" variantColor="vue" size="lg">Get started</Button>
          <Button as="a" href="https://github.com/codebender828/kiwi-ui" left-icon="github" ml="4" variant="outline" variantColor="vue" size="lg">Github</Button>
        </Flex>
      </Flex>
    </Flex>
  </Box>
</template>

<script>
import { Flex, Box, Heading, Button, Text as KText } from '@chakra-ui/vue'
export default {
  components: {
    Flex,
    Heading,
    Button,
    KText,
    Box
  }
}
</script>
