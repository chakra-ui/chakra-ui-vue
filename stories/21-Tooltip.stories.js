import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { CSSReset, Tooltip, Button } from 'kiwi-core'

storiesOf('UI | Tooltip', module)
  .addDecorator(centered)
  .add('With custom separator', () => ({
    components: { CSSReset, Tooltip, Button },
    template: `
      <div>
        <CSSReset />
        <Tooltip label="Aborts requests for display">
          <Button left-icon="user-slash" w="400px" variant-color="red">Delete Account</Button>
        </Tooltip>
      </div>
    `
  }))
