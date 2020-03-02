<template>
  <Box w="300px">
    <Button @click="isOpen = true">Open Modal</Button>
    <Modal :isOpen="isOpen">
      <ModalContent>
        <ModalHeader>
          <h3>Modal Header</h3>
        </ModalHeader>
        <ModalBody>
          <Lorem add="2s" />
        </ModalBody>
        <ModalFooter>
          <Button mr="3">Cancel</Button>
          <Button id="delete" variantColor="red">Delete Account</Button>
        </ModalFooter>
        <ModalCloseButton @click="isOpen = false" />
      </ModalContent>
      <ModalOverlay />
    </Modal>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton } from '../packages/kiwi-core/dist/esm'
import Lorem from 'vue-lorem-ipsum'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Lorem
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
    }
  }
}
</script>
