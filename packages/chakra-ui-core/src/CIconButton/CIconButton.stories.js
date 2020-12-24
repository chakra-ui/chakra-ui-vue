import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CIconButton } from '..'

storiesOf('UI | IconButton', module)
  .add('Default IconButton', () => ({
    components: { CIconButton },
    template: `
      <div>
        <CIconButton aria-label="Phone" variant-color="blue" @click="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave" icon="phone" />
        <CIconButton aria-label="Map" variant-color="orange" @click="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave" icon="map" />
        <CIconButton aria-label="Upload" variant-color="pink" @click="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave" icon="server" />
        <CIconButton aria-label="Send" variant-color="green" @click="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave" icon="send" />
        <CIconButton aria-label="Discord" @click="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave" icon="discord" />
      </div>
    `,
    methods: {
      onClick: action('Icon button clicked'),
      onMouseover: action('[NATIVE_EVENT]: Mouseover event'),
      onMouseleave: action('[NATIVE_EVENT]: Mouseleave event')
    }
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
