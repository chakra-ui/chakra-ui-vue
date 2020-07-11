import { storiesOf } from '@storybook/vue'
import { CAvatar, CButton, CBadge, CPopover, CPopoverTrigger, CPopoverContent, CDarkMode, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter, CBox, CButtonGroup, CText } from '..'

storiesOf('UI | Popover', module)
  .add('Basic Usage', () => ({
    components: { CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter },
    template: `
    <CPopover :closeOnBlur="false">
      <CPopoverTrigger>
        <CButton>Trigger</CButton>
      </CPopoverTrigger>
      <CPopoverContent zIndex="4">
        <CPopoverArrow />
        <CPopoverCloseButton pos="absolute" />
        <CPopoverHeader>Confirmation!</CPopoverHeader>
        <CPopoverBody>Are you sure you want to have that milkshake?</CPopoverBody>
      </CPopoverContent>
    </CPopover>
    `
  }))
  .add('With Portal', () => ({
    components: { CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter },
    template: `
      <CPopover usePortal>
        <CPopoverTrigger>
          <CButton>Trigger</CButton>
        </CPopoverTrigger>
        <CPopoverContent zIndex="4">
          <CPopoverArrow />
          <CPopoverHeader>Header</CPopoverHeader>
          <CPopoverCloseButton />
          <CPopoverBody>
            <CButton variantColor="blue">Button</CButton>
          </CPopoverBody>
          <CPopoverFooter>This is the footer</CPopoverFooter>
        </CPopoverContent>
      </CPopover>
    `
  }))
  .add('Focus an element when Popover opens', () => ({
    components: { CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter, CBox, CButtonGroup },
    template: `
      <CPopover
        :initialFocusRef="() => $refs.next"
        placement="bottom"
      >
        <CPopoverTrigger>
          <CButton>Trigger</CButton>
        </CPopoverTrigger>
        <CPopoverContent
          zIndex="4"
          color="white"
          backgroundColor="blue.700"
          borderColor="blue.700"
        >
          <CPopoverHeader pt="4" fontWeight="bold" border="0">
            Manage Your Channels
          </CPopoverHeader>
          <CPopoverArrow />
          <CPopoverCloseButton />
          <CPopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </CPopoverBody>
          <CPopoverFooter
            border="0"
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            pb="4"
          >
            <CBox fontSize="sm">Step 2 of 4</CBox>
            <CButtonGroup size="sm">
              <CButton variantColor="green">Setup Email</CButton>
              <CButton variantColor="blue" ref="next">
                Next
              </CButton>
            </CButtonGroup>
          </CPopoverFooter>
        </CPopoverContent>
      </CPopover>
    `
  }))
  .add('Accessing Internal state', () => ({
    components: { CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter, CBox },
    template: `
      <CPopover
        initialFocusRef="#initRef"
        placement="right"
        v-slot="{ isOpen, onClose }"
      >
        <CPopoverTrigger>
          <CButton>Click to {{ isOpen ? "close" : "open" }}</CButton>
        </CPopoverTrigger>
        <CPopoverContent>
          <CPopoverHeader>This is the header</CPopoverHeader>
          <CPopoverCloseButton />
          <CPopoverArrow />
          <CPopoverBody>
            <CBox>
              Hello. Nice to meet you! This is the body of the popover
            </CBox>
            <CButton
              mt="4"
              variantColor="blue"
              @click="onClose"
              id="initRef"
            >
              Close
            </CButton>
          </CPopoverBody>
          <CPopoverFooter>This is the footer</CPopoverFooter>
        </CPopoverContent>
      </CPopover>
    `
  }))
  .add('Customizing the Popover', () => ({
    components: { CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter, CBox },
    template: `
      <CPopover>
        <CPopoverTrigger>
          <CBox
            tabIndex="0"
            role="button"
            aria-label="Some box"
            p="5"
            w="120px"
            bg="gray.300"
          >
            Click
          </CBox>
        </CPopoverTrigger>
        <CPopoverContent zIndex="4" backgroundColor="tomato" color="white">
          <CPopoverHeader fontWeight="semibold">Customization</CPopoverHeader>
          <CPopoverArrow backgroundColor="pink.500" />
          <CPopoverCloseButton backgroundColor="purple.500" />
          <CPopoverBody>
            Tadaa!! The arrow color and background color is customized. Check the
            props for each component.
          </CPopoverBody>
        </CPopoverContent>
      </CPopover>
    `
  }))
  .add('Hover Trigger', () => ({
    components: { CDarkMode, CText, CButton, CPopover, CPopoverTrigger, CPopoverContent, CPopoverHeader, CPopoverBody, CPopoverArrow, CPopoverCloseButton, CPopoverFooter, CBox, CAvatar, CBadge },
    template: `
      <CPopover trigger="hover">
        <CPopoverTrigger>
          <CButton color="blue.500">
            Hover to see @swyx profile
          </CButton>
        </CPopoverTrigger>
        <CDarkMode>
          <CPopoverContent border="0" zIndex="4" width="400px" color="white">
            <CBox p="5">
              <CAvatar
                name="swyx"
                src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
              />
              <CText mt="4" fontWeight="bold">
                swyx
                <CBadge ml="3" variant="solid" fontSize="xs">
                  Follows you
                </CBadge>
              </CText>
              <CText mt="3">
                Infinite Builder working on DX @Netlify. Helping people
                #LearnInPublic
              </CText>
            </CBox>
          </CPopoverContent>
        </CDarkMode>
      </CPopover>
    `
  }))
