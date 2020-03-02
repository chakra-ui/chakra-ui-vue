<template>
  <Box w="300px">
    <Button variant-color="blue" @click="showToast">Show Toast</Button>
    <Textarea
      maxWidth="sm"
      mx="auto"
      mt="2"
      placeholder="Here is a sample placeholder"
      size="md"
    />
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button,
  Textarea } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Textarea,
    Button
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
  methods: {
    showToast () {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
    },
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
