import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { Box, Checkbox, Stack } from '../packages/kiwi-core/src'

storiesOf('UI | Checkbox', module)
  .add('Basic Usage', () => ({
    components: { Box, Checkbox },
    template: `
      <Box mb="3">
        <Checkbox @change="action" v-model="isChecked">
          Checkbox
        </Checkbox>
      </Box>
    `,
    data () {
      return {
        isChecked: true
      }
    },
    methods: {
      action: action()
    }
  }))
  .add('Disabled', () => ({
    components: { Stack, Checkbox },
    template: `
      <Stack spacing="10" isInline>
        <Checkbox isDisabled>Checkbox</Checkbox>
        <Checkbox isDisabled defaultIsChecked>
          Checkbox
        </Checkbox>
      </Stack>
    `
  }))
