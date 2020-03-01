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
  .add('With custom colors', () => ({
    components: { Stack, Checkbox },
    template: `
      <Stack spacing="10" isInline>
        <Checkbox variantColor="red" defaultIsChecked>
          Checkbox
        </Checkbox>
        <Checkbox variantColor="green" defaultIsChecked>
          Checkbox
        </Checkbox>
      </Stack>
    `
  }))
  .add('With sizes', () => ({
    components: { Stack, Checkbox },
    template: `
      <Stack spacing="10" isInline>
        <Checkbox size="sm" variantColor="red" defaultIsChecked>
          Checkbox
        </Checkbox>
        <Checkbox siz="md" variantColor="green" defaultIsChecked>
          Checkbox
        </Checkbox>
        <Checkbox size="lg" variantColor="pink" defaultIsChecked>
          Checkbox
        </Checkbox>
      </Stack>
    `
  }))
  .add('Invalid checkbox', () => ({
    components: { Box, Checkbox },
    template: `
      <Box mb="3">
        <Checkbox isInvalid>Checkbox</Checkbox>
      </Box>
    `
  }))
