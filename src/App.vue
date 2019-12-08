<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Box as="label" display="flex" border-color="gray.200" align-items="center" cursor="pointer" for="control-radio">
          <!-- This is the sibling input, it's visually hidden -->
          <VisuallyHidden as="input" id="control-radio" type="radio" />

          <!-- This is the control box with a check icon as children -->
          <ControlBox
            size="24px"
            border="2px"
            bg="white"
            rounded="full"
            type="radio"
            border-color="inherit"
            :_checked="{
              bg: 'green.500',
              borderColor: 'green.500'
            }"
            :_hover="{ borderColor: 'gray.300' }"
            :_focus="{ boxShadow: 'outline' }"
            :_disabled="{ opacity: '40%' }"
          >
            <Box w="50%" h="50%" bg="white" rounded="full" />
          </ControlBox>

          <!-- You can pass additional text -->
          <Box as="span" ml="2" vertical-align="center" user-select="none">
            This is a Radio
          </Box>
        </Box>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, VisuallyHidden, ControlBox, Box } from 'kiwi-core'

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
