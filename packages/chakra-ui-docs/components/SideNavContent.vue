<template>
  <CBox
    p="3"
    :color="colorMode === 'light' ? 'gray.600': 'whiteAlpha.700'"
  >
    <CHeading size="xs" color="gray.400" letterSpacing="wide" mb="2" textTransform="uppercase">
      Getting Started
    </CHeading>
    <CBox v-for="(link, index) in topNavLinks" :key="`${index}-getting-started`">
      <CPseudoBox
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
      </CPseudoBox>
    </CBox>
    <CHeading size="xs" color="gray.400" letterSpacing="wide" mt="4" mb="2" textTransform="uppercase">
      About Chakra UI Vue
    </CHeading>
    <CBox v-for="(link, index) in aboutNavLinks" :key="`${index}-about-chakra`">
      <CPseudoBox
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
      </CPseudoBox>
    </CBox>
    <CHeading size="xs" color="gray.400" letterSpacing="wide" mt="4" mb="2" textTransform="uppercase">
      Components
    </CHeading>
    <CPseudoBox
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
    </CPseudoBox>
  </CBox>
</template>

<script>
import { boxProps, CBox, CHeading, CPseudoBox } from '@chakra-ui/vue'
import { stringToUrl } from '../utils'
import { components as componentLinks } from '../utils/all-routes'

const topNavLinks = [
  'Getting Started',
  'With Nuxt',
  'Principles',
  'Style Props',
  'Theme',
  'Extending Theme',
  'Color Mode',
  'Responsive Styles',
  'Starters',
  'Recipes',
  'Storybook'
]

const aboutNavLinks = [
  'Why Chakra UI',
  'Accessibility',
  'Constraint Based Design',
  'Contributing'
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
    CBox,
    CHeading,
    CPseudoBox
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    topNavLinks () {
      return topNavLinks.map(link => ({ name: link, path: stringToUrl(link) }))
    },
    componentLinks () {
      return componentLinks
        .filter(link => link !== 'Index')
        .map(link => ({ name: link, path: stringToUrl(link) }))
    },
    aboutNavLinks () {
      return aboutNavLinks.map(link => ({ name: link, path: stringToUrl(link) }))
    }
  }
}
</script>
