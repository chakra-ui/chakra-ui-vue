<template>
  <c-box
    v-bind="$attrs"
    p="3"
    :color="colorMode === 'light' ? 'gray.600': 'whiteAlpha.700'"
  >
    <c-heading size="xs" color="gray.400" letter-spacing="wide" mb="2" text-transform="uppercase">
      Getting Started
    </c-heading>
    <c-box v-for="(link, index) in topNavLinks" :key="`${index}-getting-started`">
      <c-pseudo-box
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
      </c-pseudo-box>
    </c-box>
    <c-heading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
      About Chakra UI Vue
    </c-heading>
    <c-box v-for="(link, index) in aboutNavLinks" :key="`${index}-about-chakra`">
      <c-pseudo-box
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
      </c-pseudo-box>
    </c-box>
    <c-heading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
      Tooling
    </c-heading>
    <c-pseudo-box
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
    </c-pseudo-box>
    <c-heading
      size="xs"
      color="gray.400"
      letter-spacing="wide"
      mt="4"
      mb="2"
      text-transform="uppercase"
    >
      Components
    </c-heading>
    <c-pseudo-box
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
    </c-pseudo-box>
  </c-box>
</template>

<script>
import { CBox, CHeading, CPseudoBox } from '@chakra-ui/vue'
import { stringToUrl } from '../utils'
import { components as componentLinks, topNavLinks, aboutNavLinks, toolingLinks } from '../utils/all-routes'

export default {
  name: 'SideNavContent',
  components: {
    CBox, CHeading, CPseudoBox
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
