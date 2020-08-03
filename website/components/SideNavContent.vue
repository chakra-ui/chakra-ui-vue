<template>
  <CBox
    v-bind="$attrs"
    p="3"
    :color="colorMode === 'light' ? 'gray.600': 'whiteAlpha.700'"
  >
    <CHeading size="xs" color="gray.400" letter-spacing="wide" mb="2" text-transform="uppercase">
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
          textDecoration: 'none',
          transform: 'translateX(3px)'
        }"
        transition="background-color,transform 0.15s ease-in"
        d="block"
        rounded="md"
        :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
        :color="$route.path === link.path ? 'vue.700' : 'inherit'"
        font-weight="bold"
        font-size="sm"
        text-decoration="none"
      >
        {{ link.name }}
      </CPseudoBox>
    </CBox>
    <CHeading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
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
          textDecoration: 'none',
          transform: 'translateX(3px)'
        }"
        d="block"
        rounded="md"
        :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
        :color="$route.path === link.path ? 'vue.700' : 'inherit'"
        font-weight="bold"
        font-size="sm"
        text-decoration="none"
        transition="background-color,transform 0.15s ease-in"
      >
        {{ link.name }}
      </CPseudoBox>
    </CBox>
    <CHeading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
      Tooling
    </CHeading>
    <CPseudoBox
      v-for="(link, index) in toolingLinks"
      :key="`${index}-tooling`"
      as="nuxt-link"
      :to="link.path"
      outline="none"
      p="0.2rem"
      :_focus="{
        shadow: 'outline',
      }"
      :_hover="{
        textDecoration: 'none',
        transform: 'translateX(3px)'
      }"
      transition="background-color,transform 0.15s ease-in"
      d="block"
      rounded="md"
      font-weight="bold"
      font-size="sm"
      text-decoration="none"
      :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
      :color="$route.path === link.path ? 'vue.700' : 'inherit'"
    >
      {{ link.name }}
    </CPseudoBox>
    <CHeading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
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
        textDecoration: 'none',
        transform: 'translateX(3px)'
      }"
      transition="background-color,transform 0.15s ease-in"
      d="block"
      rounded="md"
      font-weight="bold"
      font-size="sm"
      text-decoration="none"
      :bg="$route.path === link.path ? 'vue.50' : 'transparent'"
      :color="$route.path === link.path ? 'vue.700' : 'inherit'"
    >
      {{ link.name }}
    </CPseudoBox>
  </CBox>
</template>

<script>
import { CBox, CHeading, CPseudoBox } from '@chakra-ui/vue'
import { stringToUrl } from '../utils'
import { components as componentLinks, topNavLinks, aboutNavLinks, toolingLinks } from '../utils/all-routes'

export default {
  name: 'SideNavContent',
  components: {
    CBox,
    CHeading,
    CPseudoBox
  },
  inheritAttrs: false,
  inject: ['$chakraColorMode'],
  props: {
    contentHeight: {
      type: String,
      default: 'calc(100vh - 4rem)'
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    topNavLinks () {
      return this.parsedLinks(topNavLinks)
    },
    componentLinks () {
      return this.parsedLinks(
        componentLinks
          .filter(link => link !== 'Index')
      )
    },
    aboutNavLinks () {
      return this.parsedLinks(aboutNavLinks)
    },
    toolingLinks () {
      return this.parsedLinks(toolingLinks)
    },
    parsedLinks () {
      return value => Array.isArray(value)
        ? value.map(link => ({ name: link, path: stringToUrl(link) }))
        : []
    }
  }
}
</script>
