<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Button left-icon="check" mb="3" variant-color="blue" @click="showModal">Show Modal</Button>
        <Button left-icon="star" id="final" ref="final" mb="3" variant-color="blue" variant="outline">I will receive focus when closed</Button>
        <Modal
          is-centered
          :is-open="isOpen"
          :on-close="modalClosed"
        >
          <ModalContent ref="content" :content-ref="$refs.content">
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton @click="dismissModal" />
            <ModalBody>
              <KText fontWeight="bold" mb="1rem">
                You can scroll the content behind the modal
              </KText>
              <Lorem add="2s" />
            </ModalBody>
            <ModalFooter>
              <Button id="save" ref="save" variantColor="blue" mr="3">
                Save
              </Button>
              <Button id="cancel" ref="cancel" @click="dismissModal">Cancel</Button>
            </ModalFooter>
          </ModalContent>
          <ModalOverlay />
        </Modal>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import Lorem from 'vue-lorem-ipsum'
import { ThemeProvider, Button, Modal, Text as KText, ModalOverlay, CSSReset, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    KText,
    Lorem,
    CSSReset
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    modalClosed (params) {
      console.log('MODAL: Closed', params)
    },
    showModal (params) {
      this.isOpen = true
    },
    dismissModal (params) {
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
