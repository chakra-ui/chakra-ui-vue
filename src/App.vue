<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <Anchor is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.900" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <AlertDialog
          :is-open="isOpen"
          :least-destructive-ref="$refs.cancelRef"
          :on-close="close"
          ref="alertDialog"
        >
        <AlertDialogOverlay />
        <AlertDialogContent ref="alertDialogContent">
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
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Link as Anchor, Icon, CSSReset, Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
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
  mounted () {
    this.$nextTick(() => {
      console.log('App refs', this.$refs)
    })
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
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
</style>
