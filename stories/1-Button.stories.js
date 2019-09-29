import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Button from '../src/components/Button/index.vue'

storiesOf('UI | Button', module)
  .addDecorator(centered)
  .add('Primary', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action">Solid</Button>
        <Button variant="outlined" @click="action">Outlined</Button>
        <Button variant="ghost" @click="action">Ghost</Button>
        <Button variant="flat" @click="action">Flat</Button>
        <Button variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Secondary', () => ({
    components: { Button },
    template: `
      <div>
        <Button color="secondary" @click="action">Solid</Button>
        <Button color="secondary" variant="outlined" @click="action">Outlined</Button>
        <Button color="secondary" variant="ghost" @click="action">Ghost</Button>
        <Button color="secondary" variant="flat" @click="action">Flat</Button>
        <Button color="secondary" variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Success', () => ({
    components: { Button },
    template: `
      <div>
        <Button color="success" @click="action">Solid</Button>
        <Button color="success" variant="outlined" @click="action">Outlined</Button>
        <Button color="success" variant="ghost" @click="action">Ghost</Button>
        <Button color="success" variant="flat" @click="action">Flat</Button>
        <Button color="success" variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Warning', () => ({
    components: { Button },
    template: `
      <div>
        <Button color="warning" @click="action">Solid</Button>
        <Button color="warning" variant="outlined" @click="action">Outlined</Button>
        <Button color="warning" variant="ghost" @click="action">Ghost</Button>
        <Button color="warning" variant="flat" @click="action">Flat</Button>
        <Button color="warning" variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Danger', () => ({
    components: { Button },
    template: `
    <div>
      <Button color="danger" @click="action">Solid</Button>
      <Button color="danger" variant="outlined" @click="action">Outlined</Button>
      <Button color="danger" variant="ghost" @click="action">Ghost</Button>
      <Button color="danger" variant="flat" @click="action">Flat</Button>
      <Button color="danger" variant="link" @click="action">Link</Button>
    </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Dark', () => ({
    components: { Button },
    template: `
    <div>
      <Button color="dark" @click="action">Solid</Button>
      <Button color="dark" variant="outlined" @click="action">Outlined</Button>
      <Button color="dark" variant="ghost" @click="action">Ghost</Button>
      <Button color="dark" variant="flat" @click="action">Flat</Button>
      <Button color="dark" variant="link" @click="action">Link</Button>
    </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Disabled', () => ({
    components: { Button },
    template: `
    <div>
      <Button disabled @click="action">Solid</Button>
      <Button disabled variant="outlined" @click="action">Outlined</Button>
      <Button disabled variant="ghost" @click="action">Ghost</Button>
      <Button disabled variant="flat" @click="action">Flat</Button>
      <Button disabled variant="link" @click="action">Link</Button>
    </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Rounded', () => ({
    components: { Button },
    template: `
    <div>
      <Button rounded @click="action">Solid</Button>
      <Button rounded color="secondary" variant="outlined" @click="action">Outlined</Button>
      <Button rounded color="success" variant="ghost" @click="action">Ghost</Button>
      <Button rounded color="warning" variant="flat" @click="action">Flat</Button>
      <Button rounded color="danger" variant="link" @click="action">Link</Button>
    </div>
    `,
    methods: { action: action('clicked') }
  }))
  .add('Ripple', () => ({
    components: { Button },
    template: `
      <Button size="lg" color="warning" @click="action">🌊 Ripple</Button>
    `,
    methods: { action: action('clicked') }
  }))
  .add('No Ripple', () => ({
    components: { Button },
    template: `
      <Button :ripple="false" size="lg" variant="ghost" @click="action">🔒 No Ripple</Button>
    `,
    methods: { action: action('clicked') }
  }))
