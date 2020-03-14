import { storiesOf } from '@storybook/vue'
import { Avatar, Button, Badge, Popover, PopoverTrigger, PopoverContent, DarkMode, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box, ButtonGroup, Text } from '..'

storiesOf('UI | Popover', module)
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
  .add('Accessing Internal state', () => ({
    components: { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box },
    template: `
      <Popover
        initialFocusRef="#initRef"
        placement="right"
        v-slot="{ isOpen, onClose }"
      >
        <PopoverTrigger>
          <Button>Click to {{ isOpen ? "close" : "open" }}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>This is the header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverArrow />
          <PopoverBody>
            <Box>
              Hello. Nice to meet you! This is the body of the popover
            </Box>
            <Button
              mt="4"
              variantColor="blue"
              @click="onClose"
              id="initRef"
            >
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Popover>
    `
  }))
  .add('Customizing the Popover', () => ({
    components: { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box },
    template: `
      <Popover>
        <PopoverTrigger>
          <Box
            tabIndex="0"
            role="button"
            aria-label="Some box"
            p="5"
            w="120px"
            bg="gray.300"
          >
            Click
          </Box>
        </PopoverTrigger>
        <PopoverContent zIndex="4" backgroundColor="tomato" color="white">
          <PopoverHeader fontWeight="semibold">Customization</PopoverHeader>
          <PopoverArrow backgroundColor="pink.500" />
          <PopoverCloseButton backgroundColor="purple.500" />
          <PopoverBody>
            Tadaa!! The arrow color and background color is customized. Check the
            props for each component.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    `
  }))
  .add('Hover Trigger', () => ({
    components: { DarkMode, KText: Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter, Box, Avatar, Badge },
    template: `
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button color="blue.500">
            Hover to see @swyx profile
          </Button>
        </PopoverTrigger>
        <DarkMode>
          <PopoverContent border="0" zIndex="4" width="400px" color="white">
            <Box p="5">
              <Avatar
                name="swyx"
                src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
              />
              <KText mt="4" fontWeight="bold">
                swyx
                <Badge ml="3" variant="solid" fontSize="xs">
                  Follows you
                </Badge>
              </KText>
              <KText mt="3">
                Infinite Builder working on DX @Netlify. Helping people
                #LearnInPublic
              </KText>
            </Box>
          </PopoverContent>
        </DarkMode>
      </Popover>
    `
  }))
