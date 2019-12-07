<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <ButtonGroup variant-color="blue" is-attached>
          <Button variant="outline">Button 1</Button>
          <Button>Button 2</Button>
          <Button variant="outline">Button 3</Button>
        </ButtonGroup>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Button, ButtonGroup } from 'kiwi-core'

export default {
  data () {
    return {
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Button,
    ButtonGroup
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
