<template>
  <theme-provider :theme="theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">

        <Alert mb="3" status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>

        <Alert mb="3" status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>

        <Alert mb="3" status="warning">
          <AlertIcon />
          Seems your account is about expire, upgrade now
        </Alert>

        <Alert mb="3" status="info">
          <AlertIcon />
          Chakra is going live on August 30th. Get ready!
        </Alert>

        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon size="40px" mr="0" />
          <AlertTitle mt="4" mb="1" fontSize="lg">
            Application submitted!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Thanks for submitting your application. Our team will get back to you soon.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  </theme-provider>
</template>

<script>
import { ThemeProvider, Alert, AlertIcon, AlertTitle, AlertDescription } from './lib/core/'
import theme from './lib/theme'

export default {
  data () {
    return {
      theme,
      element: true,
      loading: false
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
  },
  methods: {
    toggle () {
      this.element = !this.element
    },
    setLoading () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  computed: {
    iconPack () {
      return this.$kiwi.iconPack
    }
  }
}
</script>

<style lang="scss">
html,
body {
  font-family: Rubik, sans-serif;
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
</style>
