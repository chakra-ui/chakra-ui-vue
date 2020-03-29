import { storiesOf } from '@storybook/vue'
import { CBox, CStack, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper } from '..'

storiesOf('UI | NumberInput', module)
  .add('Basic Usage', () => ({
    components: { CBox, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CBox mb="3">
        <CNumberInput>
          <CNumberInputField />
          <CNumberInputStepper>
            <CNumberIncrementStepper />
            <CNumberDecrementStepper />
          </CNumberInputStepper>
        </CNumberInput>
      </CBox>
    `
  }))
  .add('With min and max', () => ({
    components: { CBox, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CBox mb="3">
        <CNumberInput :defaultValue="15" :max="20" :min="10">
          <CNumberInputField />
          <CNumberInputStepper>
            <CNumberIncrementStepper />
            <CNumberDecrementStepper />
          </CNumberInputStepper>
        </CNumberInput>
      </CBox>
    `
  }))
  .add('With step size', () => ({
    components: { CBox, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CBox mb="3">
        <CNumberInput :defaultValue="15" :step="5">
          <CNumberInputField />
          <CNumberInputStepper>
            <CNumberIncrementStepper />
            <CNumberDecrementStepper />
          </CNumberInputStepper>
        </CNumberInput>
      </CBox>
    `
  }))
  .add('With precision', () => ({
    components: { CBox, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CBox mb="3">
        <CNumberInput :defaultValue="15" :precision="2">
          <CNumberInputField />
          <CNumberInputStepper>
            <CNumberIncrementStepper />
            <CNumberDecrementStepper />
          </CNumberInputStepper>
        </CNumberInput>
      </CBox>
    `
  }))
  .add('Allowing out of range values', () => ({
    components: { CBox, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CBox mb="3">
        <CNumberInput
          :defaultValue="15"
          :max="30"
          :keepWithinRange="false"
          clampValueOnBlur
        >
          <CNumberInputField />
          <CNumberInputStepper>
            <CNumberIncrementStepper />
            <CNumberDecrementStepper />
          </CNumberInputStepper>
        </CNumberInput>
      </CBox>
    `
  }))
  .add('With input sizes', () => ({
    components: { CStack, CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
        <CStack shouldWrapChildren isInline>
          <CNumberInput size="sm" :defaultValue="15" clampValueOnBlur :max="30">
            <CNumberInputField />
            <CNumberInputStepper>
              <CNumberIncrementStepper />
              <CNumberDecrementStepper />
            </CNumberInputStepper>
          </CNumberInput>
          <CNumberInput :defaultValue="15" clampValueOnBlur :max="30">
            <CNumberInputField />
            <CNumberInputStepper>
              <CNumberIncrementStepper />
              <CNumberDecrementStepper />
            </CNumberInputStepper>
          </CNumberInput>
          <CNumberInput size="lg" :defaultValue="15" clampValueOnBlur :max="30">
            <CNumberInputField />
            <CNumberInputStepper>
              <CNumberIncrementStepper />
              <CNumberDecrementStepper />
            </CNumberInputStepper>
          </CNumberInput>
        </CStack>
    `
  }))
  .add('Changing input styles', () => ({
    components: { CNumberInput, CNumberInputField, CNumberInputStepper, CNumberIncrementStepper, CNumberDecrementStepper },
    template: `
      <CNumberInput size="sm" :defaultValue="15" clampValueOnBlur :max="30">
        <CNumberInputField focusBorderColor="red.200" />
        <CNumberInputStepper>
          <CNumberIncrementStepper
            bg="green.200"
            :_active="{ bg: 'green.300' }"
          >+</CNumberIncrementStepper>
          <CNumberDecrementStepper
            bg="pink.200"
            :_active="{ bg: 'pink.300' }"
          >-</CNumberDecrementStepper>
        </CNumberInputStepper>
      </CNumberInput>
    `
  }))
