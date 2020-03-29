import { storiesOf } from '@storybook/vue'
import { CFragment, CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton } from '..'

storiesOf('UI | Drawer', module)
  .add('Drawer', () => ({
    components: { CFragment, CInput, CButton, CDrawer, CDrawerBody, CDrawerFooter, CDrawerHeader, CDrawerOverlay, CDrawerContent, CDrawerCloseButton },
    data: () => ({ isOpen: false }),
    methods: {
      close () {
        this.isOpen = false
      }
    },
    template: `
    <CFragment>
        <CButton ref="btnRef" @click="isOpen =true">Open Drawer</CButton>

        <CDrawer :isOpen="isOpen" placement="right" :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal">
            <CDrawerOverlay />
            <CDrawerContent>
            <CDrawerCloseButton />
            <CDrawerHeader>Create your account</CDrawerHeader>

            <CDrawerBody>
                <CInput ref="inputInsideModal" placeholder="Type here..." />
            </CDrawerBody>

            <CDrawerFooter>
                <CButton variant="outline" mr="3" @click="isOpen = false">Cancel</CButton>
                <CButton color="blue">Save</CButton>
            </CDrawerFooter>
            </CDrawerContent>
        </CDrawer>
    </CFragment>
    `
  }))
