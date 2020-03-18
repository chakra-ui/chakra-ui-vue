<template>
  <Box as="main" fontFamily="body">
    <Hero />
    <Flex
      as="section"
      :px="[10, 10, 24]"
      py="10"
      :flexDir="['column', 'column', 'row']"
      fontFamily="body"
    >
      <Grid :templateColumns="['auto', 'auto', 'repeat(3, 1fr)']" gap="6">
        <Box m="3">
          <Flex alignItems="center" mb="5">
            <Flex
              justifyContent="center"
              color="white"
              alignItems="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <Icon size="25px" name="universal-access" />
            </Flex>
            <Heading as="h4" size="md">Accessible</Heading>
          </Flex>
          Chakra UI strictly follows WAI-ARIA standards. All components come
          with proper attributes and keyboard interactions out of the box.
        </Box>
        <Box m="3">
          <Flex alignItems="center" mb="5">
            <Flex
              justifyContent="center"
              color="white"
              alignItems="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <Icon size="25px" name="palette" />
            </Flex>
            <Heading as="h4" size="md">Themeable</Heading>
          </Flex>
          Quickly and easily reference values from your theme throughout your
          entire application, on any component.
        </Box>
        <Box m="3">
          <Flex alignItems="center" mb="5">
            <Flex
              justifyContent="center"
              color="white"
              alignItems="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <Icon size="25px" name="cubes" />
            </Flex>
            <Heading as="h4" size="md">Composable</Heading>
          </Flex>
          Components were built with composition in mind. You can leverage any
          component to create new things.
        </Box>
      </Grid>
    </Flex>
    <Example />
    <Footer />
  </Box>
</template>

<script>
import { Box, Flex, Icon, Heading, Grid } from '@chakra-ui/vue'
import Hero from '~/components/Hero.vue'
import Footer from '~/components/Footer.vue'
import Example from '~/components/Example.vue'

export default {
  layout: 'home',
  components: {
    Hero,
    Box,
    Flex,
    Icon,
    Heading,
    Footer,
    Example,
    Grid
  }
}
</script>
