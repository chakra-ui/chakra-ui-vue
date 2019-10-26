import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Button from '../src/components/Button'

storiesOf('UI | Button', module)
  .addDecorator(centered)
  .add('Unstyled', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action">Solid</Button>
        <Button variant="outline" @click="action">Outlined</Button>
        <Button variant="ghost" @click="action">Ghost</Button>
        <Button variant="flat" @click="action">Flat</Button>
        <Button variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Variant Colors | Blue', () => ({
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
    methods: { action: action('Button Clicked') }
  }))
  .add('Sizes', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" variant-color="blue" size="lg">Large</Button>
        <Button variant-color="blue" size="md" @click="action">Medium</Button>
        <Button variant-color="blue" size="sm" @click="action">Small</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Rounded', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" rounded="none" variant-color="indigo">No rounded</Button>
        <Button @click="action" rounded="sm" variant-color="indigo">Small rounded</Button>
        <Button @click="action" rounded="md" variant-color="indigo">Medium rounded</Button>
        <Button @click="action" rounded="lg" variant-color="indigo">Large rounded</Button>
        <Button @click="action" rounded="full" variant-color="indigo">Full rounded</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Ripple', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" ripple variant-color="orange">No rounded</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
