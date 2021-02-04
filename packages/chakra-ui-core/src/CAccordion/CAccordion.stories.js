import { storiesOf } from '@storybook/vue'
import { CBox, CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon } from '..'

storiesOf('UI | Accordion', module)
  .add('Basic Usage', () => ({
    components: { CBox, CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>
          <CBox flex="1" textAlign="left">
            Section 1 title
          </CBox>
          <CAccordionIcon />
        </CAccordionHeader>
        <CAccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>
          <CBox flex="1" textAlign="left">
            Section 2 title
          </CBox>
          <CAccordionIcon />
        </CAccordionHeader>
        <CAccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </CAccordionPanel>
      </CAccordionItem>
    </CAccordion>
    `
  }))
  .add('Expand multiple items at once', () => ({
    components: { CBox, CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    template: `
      <CAccordion allowMultiple :defaultIndex="[0]">
        <CAccordionItem>
          <CAccordionHeader>
            <CBox flex="1" textAlign="left">
              Section 1 title
            </CBox>
            <CAccordionIcon />
          </CAccordionHeader>
          <CAccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CAccordionPanel>
        </CAccordionItem>
        <CAccordionItem>
          <CAccordionHeader>
            <CBox flex="1" textAlign="left">
              Section 2 title
            </CBox>
            <CAccordionIcon />
          </CAccordionHeader>
          <CAccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CAccordionPanel>
        </CAccordionItem>
      </CAccordion>
    `
  }))
  .add('Allow toggle', () => ({
    components: { CBox, CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    template: `
      <CAccordion allowToggle>
        <CAccordionItem>
          <CAccordionHeader>
            <CBox flex="1" textAlign="left">
              Section 1 title
            </CBox>
            <CAccordionIcon />
          </CAccordionHeader>
          <CAccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CAccordionPanel>
        </CAccordionItem>
        <CAccordionItem>
          <CAccordionHeader>
            <CBox flex="1" textAlign="left">
              Section 2 title
            </CBox>
            <CAccordionIcon />
          </CAccordionHeader>
          <CAccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CAccordionPanel>
        </CAccordionItem>
      </CAccordion>
    `
  }))
  .add('Styled Expanded', () => ({
    components: { CBox, CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    template: `
      <CAccordion allowToggle>
        <CAccordionItem>
          <CAccordionHeader
            :_expanded="{
              bg: 'tomato',
              color: 'white'
            }"
          >
            <CBox flex="1" textAlign="left">
              Click me to see a different style
            </CBox>
            <CAccordionIcon />
          </CAccordionHeader>
          <CAccordionPanel pb="4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CAccordionPanel>
        </CAccordionItem>
      </CAccordion>
    `
  }))
