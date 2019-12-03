<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Button variant-color="blue" @click="toggle">Show Toast</Button>
        <Alert font-family="body" mb="3" status="info">
          <AlertIcon />
          Kiwi is the best Vue component library
        </Alert>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Button, Alert, AlertIcon, useToast } from 'kiwi-core'

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
    Button,
    Alert,
    AlertIcon
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
