import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CCloseButton } from '..'

storiesOf('UI | CloseButton', module)
  .add('Default CloseButton', () => ({
    components: { CCloseButton },
    template: `
      <div>
        <CCloseButton @click="onClick" />
      </div>
    `,
    methods: {
      onClick: action('Close button clicked')
    }
  }))
  .add('With size', () => ({
    components: { CCloseButton },
    template: `
      <div>
        <CCloseButton mx="3" @click="action" size="sm" />
        <CCloseButton mx="3" />
        <CCloseButton mx="3" size="lg" />
      </div>
    `
  }))
