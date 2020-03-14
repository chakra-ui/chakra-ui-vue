import { storiesOf } from '@storybook/vue'
import { IconButton } from '..'

storiesOf('UI | IconButton', module)
  .add('Default IconButton', () => ({
    components: { IconButton },
    template: `
      <div>
        <IconButton _aria-label="Phone" variant-color="blue" icon="phone" />
      </div>
    `
  }))
  .add('With sizes', () => ({
    components: { IconButton },
    template: `
      <div>
        <IconButton _aria-label="Phone" size="sm" mx="3" variant-color="blue" icon="phone" />
        <IconButton _aria-label="Phone" size="md" mx="3" variant-color="blue" icon="phone" />
        <IconButton _aria-label="Phone" size="lg" mx="3" variant-color="blue" icon="phone" />
      </div>
    `
  }))
  .add('With colors', () => ({
    components: { IconButton },
    template: `
      <div>
        <IconButton _aria-label="Phone" size="sm" mx="3" variant-color="green" icon="phone" />
        <IconButton _aria-label="Phone" size="md" mx="3" variant-color="orange" icon="star" />
        <IconButton _aria-label="Phone" size="lg" mx="3" variant-color="red" icon="email" />
      </div>
    `
  }))
  .add('With Loading', () => ({
    components: { IconButton },
    template: `
      <div>
        <IconButton _aria-label="Phone" is-loading size="lg" mx="3" variant-color="indigo" icon="phone" />
      </div>
    `
  }))
  .add('With Rounding', () => ({
    components: { IconButton },
    template: `
      <div>
        <IconButton _aria-label="Phone" is-round size="lg" mx="3" variant-color="indigo" icon="star" />
      </div>
    `
  }))
