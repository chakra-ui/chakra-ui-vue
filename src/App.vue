<template>
  <Box>
    <Toggle v-model="isOpen" />
  </Box>
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
      isOpen: true
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
  mounted () {
  },
  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    },
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>
