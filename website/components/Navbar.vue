<template>
  <CBox
    as="nav"
    h="60px"
    px="4"
    d="flex"
    align-items="center"
    shadow="sm"
  >
    <CLink as="nuxt-link" w="130px" to="/" font-weight="bold" font-size="1.2rem">
      <Logo />
    </CLink>
    <CBadge
      variant-color="vue"
      variant="solid"
      font-size="0.9em"
      ml="2"
      font-family="mono"
      rounded="md"
      text-transform="lowercase"
    >
      v{{ version }}
    </CBadge>
    <AlgoliaSearch ml="auto" />
    <CBox
      as="ul"
      :color="colorMode === 'light' ? 'gray.500' : 'whiteAlpha.900'"
      d="flex"
      align-items="center"
      list-style-type="none"
    >
      <CBox :display="['none', 'none', 'block']" as="li" mr="2">
        <span id="github-star-button" />
      </CBox>
      <CBox as="li" mr="2">
        <CIconButton
          as="a"
          variant="ghost"
          variant-color="gray"
          aria-label="View Github repo"
          target="_blank"
          href="https://github.com/chakra-ui/chakra-ui-vue"
          icon="github"
        />
      </CBox>
      <CBox as="li">
        <CIconButton
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
      </CBox>
      <MobileNav />
    </CBox>
  </CBox>
</template>

<script>
import { CBox, CLink, CIconButton, CBadge } from '@chakra-ui/vue'
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
    CBadge,
    Logo,
    CIconButton,
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
