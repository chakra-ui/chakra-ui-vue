<template>
  <div class="container">
    <MDXProvider :components="MDXComponents">
      <CThemeProvider>
        <CColorModeProvider v-slot="{ colorMode }">
          <CBox
            font-family="body"
            :bg="colorMode === 'light' ? 'white' : 'gray.800'"
            :color="colorMode === 'light' ? 'black' : 'whiteAlpha.900'"
          >
            <CReset />
            <Navbar />
            <CFlex max-h="calc(100vh - 60px)">
              <Sidebar />
              <CBox
                ref="docContainer"
                :class="styles(colorMode)"
                as="section"
                w="100%"
                height="calc(100vh - 60px)"
                overflow-y="scroll"
                :py="[5, 20]"
                :px="[10, 10, 20, '14rem']"
                font-family="body"
              >
                <keep-alive>
                  <Nuxt id="page-content" />
                </keep-alive>
                <Footer v-if="$route.path === '/'" />
                <FileContributors />
                <BottomLink v-if="$route.path !== '/'" />
              </CBox>
            </CFlex>
          </CBox>
        </CColorModeProvider>
      </CThemeProvider>
    </MDXProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
  CFlex,
  Css
} from '@chakra-ui/vue'
import { css } from 'emotion'
import { MDXProvider } from 'mdx-vue'

import MDXComponents from '../components/MDXComponents'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import FileContributors from '../components/FileContributors'
import BottomLink from '../components/BottomLink'

// import { stringToUrl } from '../utils'

export default {
  name: 'DefaultLayout',
  components: {
    FileContributors,
    MDXProvider,
    CThemeProvider,
    CColorModeProvider,
    CBox,
    Navbar,
    Sidebar,
    Footer,
    CReset,
    CFlex,
    BottomLink
  },
  data () {
    return {
      thBg: {
        light: 'gray.50',
        dark: 'whiteAlpha.100'
      },
      callout: {
        light: {
          bg: 'rgb(254, 235, 200)',
          color: 'black',
          borderLeft: '4px solid rgb(221, 107, 32)'
        },
        dark: {
          bg: 'rgba(251, 211, 141, 0.16)',
          color: 'inherit',
          borderLeft: '4px solid rgb(251, 211, 141);'
        }
      },
      code: {
        light: {
          bg: 'orange.100',
          color: 'orange.800'
        },
        dark: {
          bg: 'rgba(250, 240, 137, 0.16)',
          color: 'rgb(250, 195, 137)'
        }
      },
      MDXComponents
    }
  },
  metaInfo () {
    return {
      title: 'Chakra UI Vue',
      meta: [
        {
          hid: 'description',
          'data-n-head': '1',
          name: 'description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'author',
          content: 'Jonathan Bakebwa'
        },
        {
          name: 'image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'image',
          property: 'og:image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        {
          name: 'description',
          property: 'og:description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        // OpenGraph tags
        {
          name: 'og:url',
          content: this.$route.fullPath
        },
        {
          name: 'og:type',
          content: 'article'
        },
        {
          name: 'og:description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        {
          name: 'og:image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'twitter:title',
          content: 'Chakra UI Vue | Documentation'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:creator',
          content: '@chakraui_vue'
        }]
    }
  },
  computed: {
    styles () {
      return colorMode => css(Css({
        th: {
          bg: this.thBg[colorMode]
        },
        '.preview-panel': {
          borderColor: this.thBg[colorMode]
        },
        'table, p': {
          code: {
            ...this.code[colorMode],
            fontSize: 'sm'
          }
        },
        blockquote: {
          ...this.callout[colorMode],
          code: {
            ...this.code[colorMode],
            fontSize: 'sm'
          }
        },
        'h1, h2, h3': {
          code: this.code[colorMode]
        },
        li: {
          code: {
            ...this.code[colorMode],
            fontSize: 'sm'
          }
        }
      })(this.$chakra.theme))
    },
    hash () {
      return this.$route.name
    }
  },
  watch: {
    '$route.path' (newVal) {
      this.$nextTick(() => {
        this.$refs.docContainer.$el.scrollTo(0, 0)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../css/components.scss';
</style>
