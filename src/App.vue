<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <ButtonGroup variant-color="indigo" is-attached>
          <Button left-icon="star" variant="outline">Favourite</Button>
          <Button left-icon="search">Search</Button>
          <Button left-icon="plus" variant="outline">Add Friend</Button>
        </ButtonGroup>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Button, ButtonGroup } from 'kiwi-core'

export default {
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
</style>
