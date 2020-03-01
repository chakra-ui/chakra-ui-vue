<template>
  <div>
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
  </div>
</template>

<script lang="js">
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  },
  data () {
    return {
      inputValue: 'Default value',
      shouldShowPassword: false
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  },

  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    }
  }
}
</script>
