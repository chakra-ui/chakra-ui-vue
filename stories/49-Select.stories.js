import { storiesOf } from '@storybook/vue'
import { Box, Stack, Select } from '../packages/kiwi-core/src'

storiesOf('UI | Select', module)
  .add('Basic Usage', () => ({
    components: { Box, Select },
    template: `
      <Box mb="3" w="300px">
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
    `
  }))
  .add('Changing select size', () => ({
    components: { Stack, Select },
    template: `
      <Stack spacing="3" w="300px">
        <Select placeholder="large size" size="lg" />
        <Select placeholder="default size" size="md" />
        <Select placeholder="small size" size="sm" />
      </Stack>
    `
  }))
  .add('Changing variant', () => ({
    components: { Stack, Select },
    template: `
      <Stack spacing="3" w="300px">
        <Select placeholder="Outline" variant="outline" />
        <Select placeholder="Filled" variant="filled" />
        <Select placeholder="Flushed" variant="flushed" />
        <Select placeholder="Unstyled" variant="unstyled" />
      </Stack>
    `
  }))
  .add('Override styles', () => ({
    components: { Select },
    template: `
      <Select
        backgroundColor="tomato"
        borderColor="tomato"
        color="white"
        placeholder="Woohoo! A new background color!"
      />
    `
  }))
