import IconButton from '../packages/kiwi-core/src/Icon/index';
<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <ColorModeProvider v-slot="{ colorMode, toggleColorMode }">
      <Box
        as="main"
        :bg="colorMode === 'light' ? 'white' : 'gray.800'"
        :color="colorMode === 'light' ? 'gray.800' : 'gray.50'"
        class="root"
      >
        <Heading mb="50px" as="h3">Accordion</Heading>
        <CSSReset />
        <Button
          as="a"
          target="_blank"
          href="https://github.com/codebender828/kiwi-ui"
          position="fixed"
          top="3"
          left="3"
          variant="ghost"
          left-icon="github"
        >
          Github
        </Button>
        <IconButton
          position="fixed"
          top="3"
          right="3"
          :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`"
          variant="ghost"
          :icon="colorMode === 'light' ? 'sun' : 'moon'"
          @click="toggleColorMode"
        >
        </IconButton>
        <div class="wrapper">
            <Accordion allowToggle allowMultiple>
              <AccordionItem>
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb="4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem v-slot="{ isExpanded }">
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    Section 2 title | isExpanded: {{ isExpanded }}
                  </Box>
                  <AccordionIcon size="12px" :name="isExpanded ? 'minus' : 'add'" />
                </AccordionHeader>
                <AccordionPanel pb="4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
        </div>
      </Box>
    </ColorModeProvider>
  </theme-provider>
</template>

<script lang="js">
import {
  ThemeProvider,
  Heading,
  CSSReset,
  Button,
  Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon,
  Box,
  IconButton,
  ColorModeProvider } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Heading,
    ThemeProvider,
    Button,
    CSSReset,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box,
    IconButton,
    ColorModeProvider
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60,
      showCollapsed: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.count++
    })
    console.log('mounted', this.$refs)
  },
  methods: {
    logClick () {
      console.log('downloading')
    },
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    showPopper2 () {
      this.show2 = !this.show2
    },
    hidePopper2 () {
      this.show2 = false
    },
    focus (el) {
      setTimeout(() => {
        if (el) {
          if (el instanceof HTMLElement) el.focus()
          else if (el.$el && el.$el.focus) el.$el.focus()
        }
      })
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0
}

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
  }
}

/* Consumer transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
