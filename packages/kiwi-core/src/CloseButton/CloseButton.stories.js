import { storiesOf } from '@storybook/vue'
import { CloseButton } from '..'

storiesOf('UI | CloseButton', module)
  .add('Default CloseButton', () => ({
    components: { CloseButton },
    template: `
      <div>
        <CloseButton />
      </div>
    `
  }))
  .add('With size', () => ({
    components: { CloseButton },
    template: `
      <div>
        <CloseButton mx="3" size="sm" />
        <CloseButton mx="3" />
        <CloseButton mx="3" size="lg" />
      </div>
    `
  }))
