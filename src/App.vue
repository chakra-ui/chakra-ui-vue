<template>
  <Box>
    <Drawer
      :isOpen="isOpen"
      placement="top"
      :onClose="close"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton @click="close"/>
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr="3" @click="close">
            Cancel
          </Button>
          <Button variant-color="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <Button variant-color="red" @click="open">
      Delete Customer
    </Button>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
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
