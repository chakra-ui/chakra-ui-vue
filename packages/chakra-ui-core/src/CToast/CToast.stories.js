import { storiesOf } from '@storybook/vue'
import { CButton } from '..'
import { colorModeObserver } from '../utils/color-mode-observer'

const watch = {
  $theme: {
    immediate: true,
    handler (theme) {
      colorModeObserver.theme = theme()
    }
  },
  $icons: {
    immediate: true,
    handler (icons) {
      colorModeObserver.icons = icons
    }
  }
}

storiesOf('UI | Toast', module)
  .add('Simple Toast', () => ({
    components: { CButton },
    watch,
    inject: ['$theme', '$icons'],
    methods: {
      showToast () {
        this.$toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'info',
          duration: 10000,
          isClosable: true
        })
      }
    },
    template: `
      <div>
        <CButton variant-color="blue" @click="showToast">Show Toast</CButton>
      </div>
    `
  }))
  .add('With status', () => ({
    components: { CButton },
    watch,
    inject: ['$theme', '$icons'],
    methods: {
      infoToast () {
        this.$toast({
          title: 'Compression complete',
          description: "We've created your account for you.",
          status: 'info',
          duration: 10000,
          isClosable: true,
          position: 'top'
        })
      },
      successToast () {
        this.$toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 10000,
          isClosable: true,
          position: 'bottom'
        })
      },
      warningToast () {
        this.$toast({
          title: 'Warning',
          description: "We've created your account for you.",
          status: 'warning',
          duration: 10000,
          isClosable: true,
          position: 'top-right'
        })
      },
      errorToast () {
        this.$toast({
          title: 'Error',
          description: "We've created your account for you.",
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'bottom-right'
        })
      }
    },
    template: `
      <div>
        <CButton variant-color="blue" @click="infoToast">Info Toast</CButton>
        <CButton variant-color="green" @click="successToast">Success Toast</CButton>
        <CButton variant-color="orange" @click="warningToast">Warning Toast</CButton>
        <CButton variant-color="red" @click="errorToast">Error Toast</CButton>
      </div>
    `
  }))
  .add('With variant', () => ({
    components: { CButton },
    watch,
    inject: ['$theme', '$icons'],
    methods: {
      successToast (variant = 'solid') {
        this.$toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 10000,
          isClosable: true,
          position: 'bottom',
          variant
        })
      }
    },
    template: `
      <div>
        <CButton variant-color="green" @click="successToast('solid')">Success Toast</CButton>
        <CButton variant-color="green" variant="outline" @click="successToast('subtle')">Success Toast</CButton>
        <CButton variant-color="green" variant="ghost" @click="successToast('leftAccent')">Success Toast</CButton>
        <CButton variant-color="green" variant="ghost" @click="successToast('topAccent')">Success Toast</CButton>
      </div>
    `
  }))
