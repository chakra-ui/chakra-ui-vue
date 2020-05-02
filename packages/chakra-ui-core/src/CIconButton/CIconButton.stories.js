import { storiesOf } from '@storybook/vue'
import { CIconButton } from '..'

storiesOf('UI | IconButton', module)
  .add('Default IconButton', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" variant-color="blue" icon="phone" />
      </div>
    `
  }))
  .add('With sizes', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" size="sm" mx="3" variant-color="blue" icon="phone" />
        <CIconButton aria-label="Phone" size="md" mx="3" variant-color="blue" icon="phone" />
        <CIconButton aria-label="Phone" size="lg" mx="3" variant-color="blue" icon="phone" />
      </div>
    `
  }))
  .add('With colors', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" size="sm" mx="3" variant-color="green" icon="phone" />
        <CIconButton aria-label="Phone" size="md" mx="3" variant-color="orange" icon="star" />
        <CIconButton aria-label="Phone" size="lg" mx="3" variant-color="red" icon="email" />
      </div>
    `
  }))
  .add('With Loading', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" is-loading size="lg" mx="3" variant-color="indigo" icon="phone" />
      </div>
    `
  }))
  .add('With Rounding', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" is-round size="lg" mx="3" variant-color="indigo" icon="star" />
      </div>
    `
  }))
