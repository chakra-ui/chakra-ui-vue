import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Badge } from '@kiwi-ui/core'

storiesOf('UI | Badge', module)
  .addDecorator(centered)
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
