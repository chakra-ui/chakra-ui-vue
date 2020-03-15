import { storiesOf } from '@storybook/vue'
import { Box, Stack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '..'

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
  .add('Allowing out of range values', () => ({
    components: { Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <Box mb="3">
        <NumberInput
          :defaultValue="15"
          :max="30"
          :keepWithinRange="false"
          clampValueOnBlur
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    `
  }))
  .add('With input sizes', () => ({
    components: { Stack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
        <Stack shouldWrapChildren isInline>
          <NumberInput size="sm" :defaultValue="15" clampValueOnBlur :max="30">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput :defaultValue="15" clampValueOnBlur :max="30">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput size="lg" :defaultValue="15" clampValueOnBlur :max="30">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
    `
  }))
  .add('Changing input styles', () => ({
    components: { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper },
    template: `
      <NumberInput size="sm" :defaultValue="15" clampValueOnBlur :max="30">
        <NumberInputField focusBorderColor="red.200" />
        <NumberInputStepper>
          <NumberIncrementStepper
            bg="green.200"
            :_active="{ bg: 'green.300' }"
          >+</NumberIncrementStepper>
          <NumberDecrementStepper
            bg="pink.200"
            :_active="{ bg: 'pink.300' }"
          >-</NumberDecrementStepper>
        </NumberInputStepper>
      </NumberInput>
    `
  }))
