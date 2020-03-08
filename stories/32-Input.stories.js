import { storiesOf } from '@storybook/vue'
import { Input } from '../packages/chakra-ui-core/src'

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

const variantStories = storiesOf('Input/Variants', module)

variantStories.add('Filled', () => ({
  components: { Input },
  template: `
  <Input variant="filled" placeholder="Text goes here"></Input>
`
}))

variantStories.add('Filled', () => ({
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
