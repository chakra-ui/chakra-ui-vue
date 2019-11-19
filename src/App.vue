<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Button variant-color="blue" @click="toggle">Show Toast</Button>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, /* CloseButton, */ Button, /* Alert, AlertIcon, */ useToast } from './lib/core/'

export default {
  data () {
    return {
      element: true,
      loading: false,
      toast: undefined
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Button
  },
  mounted () {
    this.toast = useToast({ theme: this.$kiwi.theme, icons: this.$kiwi.icons })
  },
  methods: {
    toggle () {
      this.toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 100000,
        isClosable: true
      })
      // breadstick.notify(({ h, onClose }) => {
      //   return (
      //     <ThemeProvider theme={this.$kiwi.theme} icons={this.$kiwi.icons}>
      //       <Alert mb="3" variant="solid" status="success">
      //         <AlertIcon />
      //         Kiwi is the best Vue component library
      //         <CloseButton onClick={onClose} pos={'absolute'} color={'currentColor'} size={'sm'} top={1} right={1} />
      //       </Alert>
      //     </ThemeProvider>
      //   )
      // }, { duration: 2000, position: 'bottom-left' })
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
    justify-content: center;
  }
}
</style>
