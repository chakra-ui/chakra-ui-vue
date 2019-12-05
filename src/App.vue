<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Button mb="3" variant-color="blue" @click="toggle">Subscribe</Button>
        <transition name="fade">
          <Alert v-show="isSubscribed" ref="alert" font-family="body" mb="3" status="info">
            <AlertIcon />
            Kiwi is the best Vue component library
          </Alert>
        </transition>
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
      toast: undefined,
      forwardRef: undefined,
      isSubscribed: false
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
    this.$nextTick(() => {
      this.forwardRef = this.$refs.alert
    })
  },
  methods: {
    toggle () {
      this.toast({
        title: '📬 Subscribed!',
        description: "We've subscribed you to our mailing list!",
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      this.isSubscribed = true
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
