import { storiesOf } from '@storybook/vue'
import { Fragment, Input, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '..'

storiesOf('UI | Drawer', module)
  .add('Drawer', () => ({
    components: { Fragment, Input, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton },
    data: () => ({ isOpen: false }),
    methods: {
      close () {
        this.isOpen = false
      }
    },
    template: `
    <Fragment>
        <Button ref="btnRef" @click="isOpen =true">Open Drawer</Button>

        <Drawer :isOpen="isOpen" placement="right" :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal">
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                <Input ref="inputInsideModal" placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" mr="3" @click="isOpen = false">Cancel</Button>
                <Button color="blue">Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </Fragment>
    `
  }))
