import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { Box, Switch } from '../packages/chakra-ui-core/src'

storiesOf('UI | Switch', module)
  .add('Basic Usage', () => ({
    components: { Box, Toggle: Switch },
    template: `
      <Box mb="3">
        <Toggle
          size="sm"
          @change="action"
          color="green"
          mr="3"
        />
        <Toggle
          size="md"
          @change="action"
          color="blue"
          mr="3"
        />
        <Toggle
          size="lg"
          @change="action"
          color="cyan"
        />
      </Box>
    `,
    methods: { action: action('@change(event)') }
  }))
