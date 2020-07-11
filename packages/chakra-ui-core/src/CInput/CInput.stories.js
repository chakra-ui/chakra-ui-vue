import { storiesOf } from '@storybook/vue'
import { CInput, CInputGroup, CInputLeftAddon, CInputRightAddon } from '..'

storiesOf('UI | Input', module)
  .add('Basic Usage', () => ({
    components: { CInput },
    template: `
      <CInput isInvalid placeholder="Here is a sample placeholder" size="sm" />
    `
  }))
  .add('Read only', () => ({
    components: { CInput },
    template: `
      <CInput
        placeholder="Here is a sample placeholder"
        variant="outline"
        size="md"
        focusBorderColor="green.400"
        isReadOnly
      />
    `
  }))
  .add('Filled', () => ({
    components: { CInput },
    template: `
    <CInput variant="filled" placeholder="Text goes here"></CInput>
  `
  }))
  .add('Filled w/ custom focus and error border colors', () => ({
    components: { CInput },
    template: `
      <CInput
        variant="filled"
        errorBorderColor="red.200"
        focusBorderColor="blue.400"
        placeholder="Text goes here"
      />
    `
  }))
  .add('With left and right addons', () => ({
    components: { CInput, CInputGroup, CInputLeftAddon, CInputRightAddon },
    template: `
      <c-stack spacing="4">
      <c-input-group>
        <c-input-left-addon>+256</c-input-left-addon>
        <c-input type="tel" roundedLeft="0" placeholder="phone number" />
      </c-input-group>
      <c-input-group size="sm">
        <c-input-left-addon>https://</c-input-left-addon>
        <c-input rounded="0" placeholder="mysite" />
        <c-input-right-addon>.com</c-input-right-addon>
      </c-input-group>
    </c-stack>
    `
  }))
