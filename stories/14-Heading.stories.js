import { storiesOf } from '@storybook/vue'
import { Heading } from '../packages/kiwi-core/src'

storiesOf('UI | Heading', module)
  .add('Button Group', () => ({
    components: { Heading },
    template: `
      <div>
        <Heading size="2xl">Heading 1 </Heading>
        <Heading size="xl">Heading 2 </Heading>
        <Heading size="lg">Heading 3 </Heading>
        <Heading size="md">Heading 4 </Heading>
        <Heading size="sm">Heading 5 </Heading>
        <Heading size="xs">Heading 6 </Heading>
      </div>
    `
  }))
