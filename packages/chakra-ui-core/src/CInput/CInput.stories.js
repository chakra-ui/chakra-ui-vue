import { storiesOf } from '@storybook/vue'
import { CInput } from '..'

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
