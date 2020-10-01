<template>
  <c-box
    as="nav"
    h="60px"
    px="4"
    d="flex"
    align-items="center"
    shadow="sm"
  >
    <c-link as="nuxt-link" w="130px" to="/" font-weight="bold" font-size="1.2rem">
      <logo />
    </c-link>
    <c-bagde
      variant-color="vue"
      variant="solid"
      font-size="0.9em"
      ml="2"
      font-family="mono"
      rounded="md"
      text-transform="lowercase"
    >
      v{{ version }}
    </c-bagde>
    <algolia-search ml="auto" />
    <c-box
      as="ul"
      :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'"
      d="flex"
      align-items="center"
      list-style-type="none"
    >
      <c-box :display="['none', 'none', 'block']" as="li" mr="2">
        <span id="github-star-button" />
      </c-box>
      <c-box as="li" mr="2">
        <c-icon-button
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="View Github repo"
          target="_blank"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          icon="github"
        />
      </c-box>
      <c-box as="li" mr="2">
        <c-icon-button
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="Join Discord channel"
          target="_blank"
          href="https://discord.gg/sq2Kp6x"
          icon="discord"
        />
      </c-box>
      <c-box as="li">
        <c-icon-button
          v-chakra="{
            'svg': {
              w: '12px',
              h: '12px'
            }
          }"
          variant="ghost"
          variant-color="gray"
          :aria-label="colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          @click="$toggleColorMode"
        />
      </c-box>
      <MobileNav />
    </c-box>
  </c-box>
</template>

<script>
import { CBox, CLink, CIconButton, CBagde } from '@chakra-ui/vue'
import { version } from '@chakra-ui/vue/package.json'
import Logo from './Logo.vue'
import MobileNav from './MobileNav.vue'
import AlgoliaSearch from './AlgoliaSearch.vue'

export default {
  name: 'Navbar',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  components: {
    CBox,
    CLink,
    CIconButton,
    CBagde,
    Logo,
    MobileNav,
    AlgoliaSearch
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    version () {
      return version
    }
  },
  watch: {
    colorMode (newVal) {
      if (!process.client) { return }
      try {
        localStorage.setItem('chakra_ui_docs_color_mode', newVal)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted () {
    const { render } = require('github-buttons')
    await this.$nextTick()
    const container = document.querySelector('#github-star-button')
    if (!container) return

    // Github options
    const options = {
      href: 'https://github.com/chakra-ui/chakra-ui-vue',
      title: 'Star Chakra UI Vue on Github',
      'data-text': 'Star',
      'data-icon': 'octicon-star',
      'data-size': 'large',
      'data-show-count': true,
      'aria-label': 'Star Chakra UI Vue on Github'
    }

    render(options, (el) => {
      container.appendChild(el)
    })
  },
  created () {
    if (!process.client) { return }
    try {
      const savedColorMode = localStorage.getItem('chakra_ui_docs_color_mode')
      if (!savedColorMode) { return }

      if (this.colorMode !== savedColorMode) {
        this.$toggleColorMode()
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
