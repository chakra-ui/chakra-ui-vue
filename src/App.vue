<template>
  <theme-provider :theme="$kiwi.theme" :color-mode="colorMode" :icons="$kiwi.icons">
    <main class="root">
      <Heading mb="50px" as="h3">Popover</Heading>
      <CSSReset />
      <Anchor ref="anchor" is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.700" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <Popover trigger="hover">
          <PopoverTrigger>
            <Anchor href="#" color="blue.500">
              Hover to see @swyx profile
            </Anchor>
          </PopoverTrigger>
          <DarkMode>
            <PopoverContent border="0" zIndex="4" width="400px" color="white">
              <Box p="5">
                <Avatar
                  name="swyx"
                  src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
                />
                <KText mt="4" fontWeight="bold">
                  swyx
                  <Badge ml="3" variant="solid" fontSize="xs">
                    Follows you
                  </Badge>
                </KText>
                <KText mt="3">
                  Infinite Builder working on DX @Netlify. Helping people
                  #LearnInPublic
                </KText>
              </Box>
            </PopoverContent>
          </DarkMode>
        </Popover>
      </div>
    </main>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Heading, DarkMode, Link as Anchor, Popover, PopoverTrigger, PopoverContent, Box, Avatar, Text, Badge, Icon, CSSReset } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Heading,
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Box,
    Avatar,
    KText: Text,
    Badge,
    DarkMode
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60
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
