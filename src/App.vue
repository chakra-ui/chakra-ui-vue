<template>
  <div>
    <!-- With custom element -->
    <Box mb="3">
      <Toggle
        size="sm"
        @change="handleChange"
        color="green"
        mr="3"
      />
      <Toggle
        size="md"
        @change="handleChange"
        color="blue"
        mr="3"
      />
      <Toggle
        size="lg"
        @change="handleChange"
        color="cyan"
      />
    </Box>
  </div>
</template>

<script lang="js">
import {
  Box,
  Switch } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Toggle: Switch
  },
  data () {
    return {
      inputValue: 'Default value',
      shouldShowPassword: false
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  },

  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    }
  }
}
</script>
