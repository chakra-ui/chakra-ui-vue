<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Flex
          p="6"
          bg="#404040"
          h="400px"
          w="400px"
          direction="column"
          align="center"
          justify="center"
        >
          <Box
            mx="2"
            my="2"
            p="3"
            rounded="md"
            bg="coral"
          >
            Box
          </Box>
          <Box
            mx="2"
            my="2"
            p="3"
            rounded="md"
            bg="papayawhip"
          >
            Box
          </Box>
          <Box
            mx="2"
            my="2"
            p="3"
            rounded="md"
            bg="#ffff95"
          >
            Box
          </Box>
          <Box
            mx="2"
            my="2"
            p="3"
            rounded="md"
            bg="pink"
          >
            Box
          </Box>
        </Flex>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Box, Flex } from 'kiwi-core'

export default {
  data () {
    return {
      element: true,
      loading: false,
      toast: undefined,
      forwardRef: undefined,
      isSubscribed: false
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Box,
    Flex
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
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
