import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Button from '../src/components/Button'

storiesOf('UI | Button', module)
  .addDecorator(centered)
  .add('Primary', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" variant-color="blue">Solid</Button>
        <Button variant="outline" variant-color="blue" @click="action">Outlined</Button>
        <Button variant="ghost" variant-color="blue" @click="action">Ghost</Button>
        <Button variant="flat" variant-color="blue" @click="action">Flat</Button>
        <Button variant="link" variant-color="blue" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
