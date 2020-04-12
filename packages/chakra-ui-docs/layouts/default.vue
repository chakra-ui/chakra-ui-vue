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
            <CFlex maxH="calc(100vh - 60px)">
              <Sidebar />
              <CBox
                :class="styles(colorMode)"
                as="section"
                w="100%"
                height="calc(100vh - 60px)"
                overflowY="scroll"
                pt="20"
                :px="[10, 10, 20, '14rem']"
              >
                <Nuxt id="page-content" />
                <Footer v-if="$route.path === '/index'" />
                <ClientOnly v-else>
                  <FileContributors />
                </ClientOnly>
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
    CFlex
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
          bg: '#fefcbf',
          color: '#744210'
        },
        dark: {
          bg: 'rgba(250, 240, 137, 0.16)',
          color: 'rgb(250, 240, 137)'
        }
      },
      MDXComponents
    }
  },
  metaInfo: {
    title: `Chakra UI Vue`,
    metaTags: [
      {
        name: 'description',
        content: 'Simple, Modular and Accessible UI Components for your Vue Applications. Built with Styled System.'
      }
    ]
  },
  computed: {
    styles () {
      return colorMode => css(Css({
        'th': {
          bg: this.thBg[colorMode]
        },
        '.preview-panel': {
          borderColor: this.thBg[colorMode],
          'a': {
            color: 'inherit'
          }
        },
        'table, p': {
          'code': {
            ...this.code[colorMode],
            fontSize: 'sm'
          }
        },
        'h1, h2, h3': {
          'code': this.code[colorMode]
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
  // TODO: Setup title hashing
  // mounted () {
  //   this.setPageIds()
  // },
  watch: {
    hash (newVal, oldVal) {
      console.log('Hash changed', newVal)
      // if (newVal !== oldVal) {
      //   this.pushWindowToId()
      // }
    }
  },
  methods: {
    /**
     * TODO: Finish implementing this
     * Sets the IDs for titles to allow for scrolling.
     */
    // setPageIds () {
    //   const pageWrapper = document.getElementById('page-content')
    //   const h2s = pageWrapper.querySelectorAll('h2')
    //   const h3s = pageWrapper.querySelectorAll('h3')

    //   const allTitles = [ ...h2s, ...h3s ]
    //   allTitles.forEach(title => {
    //     const content = `<div>${title.textContent}` + `<a aria-label="${title.textContent}" href="${stringToUrl(title.textContent, '#')}"></a></div>`
    //     title.innerHTML = content
    //   })

    //   setTimeout(() => {
    //     this.pushWindowToId()
    //   })
    // },
    pushWindowToId () {
      this.$router.push(this.$route.fullPath)
    }
  }
}
</script>

<style lang="scss">
@import '../css/components.scss';
</style>
