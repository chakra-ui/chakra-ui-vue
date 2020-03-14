import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { Box, Textarea } from '..'

storiesOf('UI | Textarea', module)
  .add('Basic Usage', () => ({
    components: { Box, Textarea },
    template: `
      <Box w="300px">
        <Textarea
          v-model="textareaContent"
          maxWidth="sm"
          mx="auto"
          mt="2"
          placeholder="Here is a sample placeholder"
          size="md"
          :value="textareaContent"
          @change="action"
        />
      </Box>
    `,
    data () {
      return {
        textareaContent: 'Jonathan Bakebwa is awesome'
      }
    },
    methods: {
      action: action()
    }
  }))
