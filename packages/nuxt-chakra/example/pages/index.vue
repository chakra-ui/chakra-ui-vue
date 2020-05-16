<template>
  <div class="container">
    <c-box
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <c-heading text-align="center" mb="4">
        ⚡️ Hello chakra-ui/vue
      </c-heading>
      <c-flex justify="center" direction="column" align="center">
        <c-box mb="3">
          <c-icon-button
            mr="3"
            :icon="colorMode === 'light' ? 'moon' : 'sun'"
            :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`"
            @click="toggleColorMode"
          />
          <c-button left-icon="info" variant-color="blue" @click="showToast">
            Show Toast
          </c-button>
        </c-box>
        <c-avatar-group>
          <c-avatar
            name="Evan You"
            alt="Evan You"
            src="https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg"
          >
            <c-avatar-badge size="1.0em" bg="green.500" />
          </c-avatar>
          <c-avatar
            name="Jonathan Bakebwa"
            alt="Jonathan Bakebwa"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          >
            <c-avatar-badge size="1.0em" bg="green.500" />
          </c-avatar>
          <c-avatar
            name="Segun Adebayo"
            alt="Segun Adebayo"
            src="https://pbs.twimg.com/profile_images/1169353373012897802/skPUWd6e_400x400.jpg"
          >
            <c-avatar-badge size="1.0em" bg="green.500" />
          </c-avatar>
          <c-avatar src="pop">
            <c-avatar-badge size="1.0em" border-color="papayawhip" bg="tomato" />
          </c-avatar>
        </c-avatar-group>
        <c-button
          left-icon="close"
          variant-color="red"
          mt="3"
          @click="showModal = true"
        >
          Delete Account
        </c-button>
        <c-text p="3" mt="3" bg="brand.800" color="brand.200" :data-test-custom-theme-color="$chakra.theme.colors.brand['200']">
          Brand color from extended theme
        </c-text>
        <c-modal :is-open="showModal">
          <c-modal-overlay />
          <c-modal-content>
            <c-modal-header>Are you sure?</c-modal-header>
            <c-modal-body>Deleting user cannot be undone</c-modal-body>
            <c-modal-footer>
              <c-button @click="showModal = false">
                Cancel
              </c-button>
              <c-button margin-left="3" variant-color="red" @click="showModal = false">
                Delete User
              </c-button>
            </c-modal-footer>
            <c-modal-close-button @click="showModal = false" />
          </c-modal-content>
        </c-modal>
      </c-flex>
    </c-box>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading,
  CText
} from '@chakra-ui/vue'

export default {
  name: 'App',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading,
    CText
  },
  data () {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
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
