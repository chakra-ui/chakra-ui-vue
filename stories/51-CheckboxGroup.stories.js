import { storiesOf } from '@storybook/vue'
import { Box, Checkbox, CheckboxGroup } from '../packages/chakra-ui-core/src'

storiesOf('UI | CheckboxGroup', module)
  .add('Basic Usage', () => ({
    components: { Box, Checkbox, CheckboxGroup },
    template: `
      <Box w="300px">
        <CheckboxGroup v-model="selectedValues" variantColor="green" :defaultValue="['two']">
          <Checkbox value="one">One</Checkbox>
          <Checkbox value="two">Two</Checkbox>
          <Checkbox value="three">Three</Checkbox>
        </CheckboxGroup>
      </Box>
    `,
    data () {
      return {
        selectedValues: ['two']
      }
    }
  }))
