<template>
  <Box>
    <AlertDialog
      :is-open="isOpen"
      :least-destructive-ref="$refs.cancelRef"
      :on-close="close"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader font-size="lg" font-weight="bold">
          Delete Customer
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref="cancelRef" @click="close">
            Cancel
          </Button>
          <Button variantColor="red" @click="close" ml="3">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <Button variant-color="red" @click="open">
      Delete Customer
    </Button>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogHeader } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogOverlay,
    AlertDialogHeader
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
