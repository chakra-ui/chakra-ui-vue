import { storiesOf } from '@storybook/vue'
import { CBadge } from '..'

storiesOf('UI | Badge', module)
  .add('Default Badge', () => ({
    components: { CBadge },
    template: `
      <div>
        <CBadge>Default</CBadge>
      </div>
    `
  }))
  .add('With color', () => ({
    components: { CBadge },
    template: `
      <div>
        <CBadge mx="2">Default</CBadge>
        <CBadge mx="2" variant-color="green">Success</CBadge>
        <CBadge mx="2" variant-color="red">Removed</CBadge>
        <CBadge mx="2" variant-color="indigo">New</CBadge>
      </div>
    `
  }))
  .add('With variant', () => ({
    components: { CBadge },
    template: `
      <div>
        <c-badge mx="2" variant="subtle" variant-color="green">Subtle</c-badge>
        <c-badge mx="2" variant="solid" variant-color="green">Solid</c-badge>
        <c-badge mx="2" variant="outline" variant-color="green">Outline</c-badge>
      </div>
    `
  }))
