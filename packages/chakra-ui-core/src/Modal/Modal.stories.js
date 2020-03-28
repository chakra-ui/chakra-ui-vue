import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CButton, CModal, Text as KText, CModalOverlay, CModalContent, CModalHeader, CModalFooter, CModalBody, CModalCloseButton } from '..'
import Lorem from 'vue-lorem-ipsum'

storiesOf('UI | Modal', module)
  .add('Base Modal', () => ({
    components: { CButton, CModal, Lorem, KText, CModalOverlay, CModalContent, CModalHeader, CModalFooter, CModalBody, CModalCloseButton },
    template: `
      <div>
        <CButton left-icon="check" mb="3" variant-color="blue" @click="showModal" variant="outline">Show Modal</CButton>
        <CModal
          is-centered
          :is-open="isOpen"
          :on-close="dismissModal"
          :initial-focus-ref="$refs.save"
        >
          <CModalContent ref="content" :content-ref="$refs.content">
            <CModalHeader>Create your account</CModalHeader>
            <CModalCloseButton />
            <CModalBody>
              <KText fontWeight="bold" mb="1rem">
                You can scroll the content behind the modal
              </KText>
              <Lorem add="2s" />
            </CModalBody>
            <CModalFooter>
              <CButton id="save" ref="save" variantColor="blue" mr="3">
                Save
              </CButton>
              <CButton id="cancel" ref="cancel" @click="dismissModal">Cancel</CButton>
            </CModalFooter>
          </CModalContent>
          <CModalOverlay />
        </CModal>
      </div>
    `,
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      action: action('Button Clicked'),
      showModal () {
        action('Showing modal')
        this.isOpen = true
      },
      dismissModal () {
        action('Dismissing modal')
        this.isOpen = false
      }
    }
  }))
