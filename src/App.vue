<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Heading size="2xl">Heading 1 </Heading>
        <Heading size="xl">Heading 2 </Heading>
        <Heading size="lg">Heading 3 </Heading>
        <Heading size="md">Heading 4 </Heading>
        <Heading size="sm">Heading 5 </Heading>
        <Heading size="xs">Heading 6 </Heading>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Heading } from 'kiwi-core'

export default {
  data () {
    return {
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Heading
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
