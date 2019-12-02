import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Box } from '@kiwi-ui/core'

storiesOf('UI | Box', module)
  .addDecorator(centered)
  .add('Box', () => ({
    components: { Box },
    template: `
      <div>
        <Box
          :w="['auto']"
          px="5"
          py="5"
          shadow="lg"
          my="5"
          mb="5"
          rounded="sm"
          font-family="body"
          background-color="blue.200"
          color="blue.700"
        >
          This is box component
        </Box>
      </div>
    `
  }))
