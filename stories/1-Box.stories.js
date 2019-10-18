import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Box from '../src/components/Box'

storiesOf('UI | Box', module)
  .addDecorator(centered)
  .add('Base Box', () => ({
    components: { Box },
    template: `
      <Box
        :w="['auto']"
        px="5"
        py="5"
        shadow="lg"
        my="5"
        mb="5"
        rounded="sm"
        background-color="blue.200"
        color="blue.700"
      >
        This is box component
      </Box>
    `
  }))
