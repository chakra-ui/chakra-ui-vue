import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CReset, CButton, CAlertDialog, CAlertDialogContent, CAlertDialogBody, CAlertDialogFooter, CAlertDialogOverlay, CAlertDialogHeader } from '..'

storiesOf('UI | Alert Dialog', module)
  .add('Alert Dialog', () => ({
    components: { CReset, CButton, CAlertDialog, CAlertDialogContent, CAlertDialogBody, CAlertDialogFooter, CAlertDialogOverlay, CAlertDialogHeader },
    template: `
      <div>
        <CAlertDialog
          :is-open="isOpen"
          :least-destructive-ref="$refs.cancelRef"
          :on-close="close"
        >
          <CAlertDialogOverlay />
          <CAlertDialogContent>
            <CAlertDialogHeader font-size="lg" font-weight="bold">
              Delete Customer
            </CAlertDialogHeader>

            <CAlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </CAlertDialogBody>

            <CAlertDialogFooter>
              <CButton ref="cancelRef" @click="close">
                Cancel
              </CButton>
              <CButton variantColor="red" @click="close" ml="3">
                Delete
              </CButton>
            </CAlertDialogFooter>
          </CAlertDialogContent>
        </CAlertDialog>
        <CButton variant-color="red" @click="open">
          Delete Customer
        </CButton>
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
