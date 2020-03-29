<template>
  <Box
    p="3"
    :color="colorMode === 'light' ? 'gray.600': 'whiteAlpha.700'"
  >
    <Heading size="xs" color="gray.400" letterSpacing="wide" mb="2" textTransform="uppercase">
      Getting Started
    </Heading>
    <Box v-for="(link, index) in topNavLinks" :key="`${index}-getting-started`">
      <PseudoBox
        as="nuxt-link"
        :to="link.path"
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
        :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
        :color="$route.path === link.path ? 'vue.700' : 'inherit'"
        fontWeight="bold"
        fontSize="sm"
        textDecoration="none"
        transition="background-color 0.15s ease-in"
      >
        {{ link.name }}
      </PseudoBox>
    </Box>
    <Heading size="xs" color="gray.400" letterSpacing="wide" mt="4" mb="2" textTransform="uppercase">
      Components
    </Heading>
    <PseudoBox
      v-for="(link, index) in componentLinks"
      :key="`${index}-components`"
      as="nuxt-link"
      :to="link.path"
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
      :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
      :color="$route.path === link.path ? 'vue.700' : 'inherit'"
    >
      {{ link.name }}
    </PseudoBox>
  </Box>
</template>

<script>
import { boxProps, Box, Heading, PseudoBox } from '@chakra-ui/vue'
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
  inject: ['$chakraColorMode'],
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
      return this.$chakraColorMode()
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
