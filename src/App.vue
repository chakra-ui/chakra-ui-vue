<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <label for="control-checkbox">
          <!-- This is the sibling input, it's visually hidden -->
          <VisuallyHidden as="input" id="control-checkbox" type="checkbox" checked="true" />

          <!-- This is the control box with a check icon as children -->
          <ControlBox
            borderWidth="1px"
            size="24px"
            rounded="sm"
            :_checked="{
              bg: 'green.500',
              color: 'white',
              borderColor: 'green.500'
            }"
            :_focus="{
              borderColor: 'green.600',
              boxShadow: 'outline'
            }"
          >
            <Icon name="check" size="16px" />
          </ControlBox>

          <!-- You can pass additional text -->
          <Box as="span" verticalAlign="top" ml={3}>
            Checkbox Label
          </Box>
        </label>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, VisuallyHidden, ControlBox, Box, Icon } from 'kiwi-core'

export default {
  data () {
    return {
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    VisuallyHidden,
    ControlBox,
    Icon,
    Box
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
