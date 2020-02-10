import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box, ButtonGroup } from '../packages/kiwi-core/src'

storiesOf('UI | Popover', module)
  .addDecorator(centered)
  .add('Basic Usage', () => ({
    components: { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter },
    template: `
    <Popover :closeOnBlur="false">
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent zIndex="4">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
    `
  }))
  .add('With Portal', () => ({
    components: { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter },
    template: `
      <Popover usePortal>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent zIndex="4">
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue">Button</Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Popover>
    `
  }))
  .add('Focus an element when Popover opens', () => ({
    components: { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box, ButtonGroup },
    template: `
      <Popover
        initialFocusRef="#next"
        placement="bottom"
      >
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent
          zIndex="4"
          color="white"
          backgroundColor="blue.700"
          borderColor="blue.700"
        >
          <PopoverHeader pt="4" fontWeight="bold" border="0">
            Manage Your Channels
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </PopoverBody>
          <PopoverFooter
            border="0"
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            pb="4"
          >
            <Box fontSize="sm">Step 2 of 4</Box>
            <ButtonGroup size="sm">
              <Button variantColor="green">Setup Email</Button>
              <Button variantColor="blue" id="next">
                Next
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    `
  }))
