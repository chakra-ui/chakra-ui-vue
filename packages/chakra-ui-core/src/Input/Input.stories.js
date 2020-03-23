import { storiesOf } from '@storybook/vue'
import { Input } from '..'

storiesOf('UI | Input', module)
  .add('Basic Usage', () => ({
    components: { Input },
    template: `
      <Input isInvalid placeholder="Here is a sample placeholder" size="sm" />
    `
  }))
  .add('Read only', () => ({
    components: { Input },
    template: `
      <Input
        placeholder="Here is a sample placeholder"
        variant="outline"
        size="md"
        focusBorderColor="green.400"
        isReadOnly
      />
    `
  }))
  .add('Filled', () => ({
    components: { Input },
    template: `
    <Input variant="filled" placeholder="Text goes here"></Input>
  `
  }))
  .add('Filled w/ custom focus and error border colors', () => ({
    components: { Input },
    template: `
      <Input
        variant="filled"
        errorBorderColor="red.200"
        focusBorderColor="blue.400"
        placeholder="Text goes here"
      />
    `
  }))
