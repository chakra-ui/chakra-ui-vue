import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon } from '../packages/kiwi-core/src'

storiesOf('UI | Accordion', module)
  .addDecorator(centered)
  .add('Basic Usage', () => ({
    components: { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon },
    template: `
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            Section 1 title
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            Section 2 title
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    `
  }))
  .add('Expand multiple items at once', () => ({
    components: { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon },
    template: `
      <Accordion allowMultiple :defaultIndex="[0]">
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    `
  }))
  .add('Allow toggle', () => ({
    components: { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon },
    template: `
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    `
  }))
  .add('Allow Toggle', () => ({
    components: { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon },
    template: `
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionHeader
            :_expanded="{
              bg: 'tomato',
              color: 'white'
            }"
          >
            <Box flex="1" textAlign="left">
              Click me to see a different style
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    `
  }))
