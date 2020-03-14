<template>
  <Box d="flex" flexDir="column" justifyContent="center">
    <Box :bg="['pink.100', 'green.200', 'yellow.400']" d="flex" flexDir="column" justifyContent="center" :fontSize="['sm', 'md', 'lg', 'xl']" mb="2" p="2" w="300px">
      I am a box component
    </Box>
    <Button left-icon="github">Button component</Button>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button } from '../packages/chakra-ui-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Button
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  data () {
    return {
      showModal: false,
      text: 'Demo editable text'
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
    }
  }
}
</script>
