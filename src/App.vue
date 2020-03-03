<template>
  <Box d="flex" flexDir="column" justifyContent="center">
    <Button left-icon="sun" variantColor="blue" mb="3" @click="showToast">Show Toast</Button>
    <AvatarGroup>
      <Avatar
        name="Evan You"
        src="https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg"
      >
        <AvatarBadge size="1.0em" bg="green.500" />
      </Avatar>
      <Avatar
        name="Jonathan Bakebwa"
        src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
      >
        <AvatarBadge size="1.0em" bg="green.500" />
      </Avatar>
      <Avatar
        name="Segun Adebayo"
        src="https://pbs.twimg.com/profile_images/1169353373012897802/skPUWd6e_400x400.jpg"
      >
        <AvatarBadge size="1.0em" bg="green.500" />
      </Avatar>
      <Avatar src="pop">
        <AvatarBadge size="1.0em" borderColor="papayawhip" bg="tomato" />
      </Avatar>
    </AvatarGroup>
    <Button left-icon="close" variantColor="red" mt="3" @click="showModal = true">Delete Account</Button>
    <!-- <Modal :isOpen="showModal">
      <ModalContent>
        <ModalCloseButton @click="showModal = false" />
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalBody>Deleting user cannot be undone</ModalBody>
        <ModalFooter>
          <Button @click="showModal = false">Cancel</Button>
          <Button variantColor="red" @click="showModal = false">Delete User</Button>
        </ModalFooter>
      </ModalContent>
      <ModalOverlay/>
    </Modal> -->
  </Box>
</template>

<script lang="js">
import {
  Box,
  Button,
  AvatarGroup,
  Avatar,
  AvatarBadge } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Button,
    AvatarGroup,
    Avatar,
    AvatarBadge
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
      showModal: false
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
