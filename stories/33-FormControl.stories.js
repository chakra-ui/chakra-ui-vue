import { storiesOf } from '@storybook/vue'
import { Input, FormControl, FormLabel } from '../packages/kiwi-core/src'

storiesOf('UI | FormControl', module)
  .add('Basic Usage', () => ({
    components: { Input, FormControl, FormLabel },
    template: `
      <FormControl isRequired>
        <FormLabel for="fname">First name</FormLabel>
        <Input id="fname" placeholder="First name" />
      </FormControl>
    `
  }))
