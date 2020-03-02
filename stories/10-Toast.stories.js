import { storiesOf } from '@storybook/vue'
import { Button } from '../packages/kiwi-core/src'
import { colorModeObserver } from '../packages/kiwi-core/src/utils/color-mode-observer'

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
    components: { Button },
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
        <Button variant-color="blue" @click="showToast">Show Toast</Button>
      </div>
    `
  }))
  .add('With status', () => ({
    components: { Button },
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
        <Button variant-color="blue" @click="infoToast">Info Toast</Button>
        <Button variant-color="green" @click="successToast">Success Toast</Button>
        <Button variant-color="orange" @click="warningToast">Warning Toast</Button>
        <Button variant-color="red" @click="errorToast">Error Toast</Button>
      </div>
    `
  }))
  .add('With variant', () => ({
    components: { Button },
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
        <Button variant-color="green" @click="successToast('solid')">Success Toast</Button>
        <Button variant-color="green" variant="outline" @click="successToast('subtle')">Success Toast</Button>
        <Button variant-color="green" variant="ghost" @click="successToast('leftAccent')">Success Toast</Button>
        <Button variant-color="green" variant="ghost" @click="successToast('topAccent')">Success Toast</Button>
      </div>
    `
  }))
