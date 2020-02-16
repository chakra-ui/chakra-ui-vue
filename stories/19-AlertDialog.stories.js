import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CSSReset, Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader } from '../packages/kiwi-core/src'

storiesOf('UI | Alert Dialog', module)
  .add('Alert Dialog', () => ({
    components: { CSSReset, Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader },
    template: `
      <div>
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
      </div>
    `,
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      action: action('Button Clicked'),
      open () {
        action('Alert Dialog Opened')
        this.isOpen = true
      },
      close () {
        action('Alert Dialog Closed')
        this.isOpen = false
      }
    }
  }))
