import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import CloseButton from '../src/components/CloseButton'

storiesOf('UI | CloseButton', module)
  .addDecorator(centered)
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
