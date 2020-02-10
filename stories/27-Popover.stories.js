import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverFooter } from '../packages/kiwi-core/src'

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
