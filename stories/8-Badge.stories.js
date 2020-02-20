import { storiesOf } from '@storybook/vue'
import { Badge } from '../packages/kiwi-core/src'

storiesOf('UI | Badge', module)
  .add('Default Badge', () => ({
    components: { Badge },
    template: `
      <div>
        <Badge>Default</Badge>
      </div>
    `
  }))
  .add('With color', () => ({
    components: { Badge },
    template: `
      <div>
        <Badge mx="2">Default</Badge>
        <Badge mx="2" variant-color="green">Success</Badge>
        <Badge mx="2" variant-color="red">Removed</Badge>
        <Badge mx="2" variant-color="indigo">New</Badge>
      </div>
    `
  }))
