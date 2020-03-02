<template>
  <Box>
    <Anchor href="https://chakra-ui.com"> Anchor </Anchor>
  </Box>
</template>

<script lang="js">
import {
  Box, Link } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Anchor: Link
  },
  data () {
    return {
      isOpen: false
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
