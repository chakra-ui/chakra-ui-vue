import { storiesOf } from '@storybook/vue'
import { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '../packages/kiwi-core/src'

storiesOf('UI | NumberInput', module)
  .add('Basic Usage', () => ({
    components: { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <Box mb="3">
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    `
  }))
  .add('With min and max', () => ({
    components: { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <Box mb="3">
        <NumberInput :defaultValue="15" :max="20" :min="10">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    `
  }))
  .add('With step size', () => ({
    components: { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <Box mb="3">
        <NumberInput :defaultValue="15" :step="5">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    `
  }))
  .add('With precision', () => ({
    components: { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <Box mb="3">
        <NumberInput :defaultValue="15" :precision="2">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    `
  }))
