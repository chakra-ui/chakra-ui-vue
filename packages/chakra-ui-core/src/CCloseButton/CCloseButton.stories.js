import { storiesOf } from '@storybook/vue'
import { CCloseButton } from '..'

storiesOf('UI | CloseButton', module)
  .add('Default CloseButton', () => ({
    components: { CCloseButton },
    template: `
      <div>
        <CCloseButton />
      </div>
    `
  }))
  .add('With size', () => ({
    components: { CCloseButton },
    template: `
      <div>
        <CCloseButton mx="3" size="sm" />
        <CCloseButton mx="3" />
        <CCloseButton mx="3" size="lg" />
      </div>
    `
  }))
