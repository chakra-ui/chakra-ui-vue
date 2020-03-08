<template>
  <Box d="flex" flexDir="column" justifyContent="center">
    <Editable v-model="text">
      <EditablePreview />
      <EditableInput />
    </Editable>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Editable,
  EditablePreview,
  EditableInput } from '../packages/chakra-ui-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Editable,
    EditablePreview,
    EditableInput
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
