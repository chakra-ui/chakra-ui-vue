<template>
  <Box
    p="3"
    :color="colorMode === 'light' ? 'gray.600': 'whiteAlpha.700'"
  >
    <Heading size="xs" color="gray.400" letterSpacing="wide" mb="2" textTransform="uppercase">
      Getting Started
    </Heading>
    <Box v-for="(link, index) in topNavLinks" :key="`${index}-getting-started`">
      <NuxtLink
        :to="link.path"
      >
        <PseudoBox
          as="a"
          p="0.2rem"
          outline="none"
          :_focus="{
            shadow: 'outline',
          }"
          :_hover="{
            textDecoration: 'none'
          }"
          d="block"
          rounded="md"
          fontWeight="bold"
          fontSize="sm"
          textDecoration="none"
        >
          {{ link.name }}
        </PseudoBox>
      </NuxtLink>
    </Box>
    <Heading size="xs" color="gray.400" letterSpacing="wide" mt="4" mb="2" textTransform="uppercase">
      Components
    </Heading>
    <PseudoBox
      v-for="(link, index) in componentLinks"
      :key="`${index}-components`"
      as="a"
      :href="link.path"
      outline="none"
      p="0.2rem"
      :_focus="{
        shadow: 'outline',
      }"
      :_hover="{
        textDecoration: 'none'
      }"
      d="block"
      rounded="md"
      fontWeight="bold"
      fontSize="sm"
      textDecoration="none"
    >
      {{ link.name }}
    </PseudoBox>
  </Box>
</template>

<script>
import { boxProps, Box, Heading, PseudoBox } from 'chakra-ui-core'
import { stringToUrl } from '../utils'
import componentLinks from './components'

const topNavLinks = [
  'Getting Started',
  'Principles',
  'Style Props',
  'Color Mode',
  'Responsive Styles',
  'Theme',
  'Recipes'
]

export default {
  name: 'SideNavContent',
  inject: ['$colorMode'],
  props: {
    contentHeight: {
      type: String,
      default: 'calc(100vh - 4rem)'
    },
    ...boxProps
  },
  components: {
    Box,
    Heading,
    PseudoBox
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    topNavLinks () {
      return topNavLinks.map(link => ({ name: link, path: stringToUrl(link) }))
    },
    componentLinks () {
      return componentLinks.map(link => ({ name: link, path: stringToUrl(link) }))
    }
  }
}
</script>
