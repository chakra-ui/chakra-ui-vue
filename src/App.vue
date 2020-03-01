<template>
  <div>
    <Stack spacing="10" isInline>
      <Checkbox variantColor="red" defaultIsChecked>
        Checkbox
      </Checkbox>
      <Checkbox variantColor="green" defaultIsChecked>
        Checkbox
      </Checkbox>
    </Stack>
  </div>
</template>

<script lang="js">
import {
  Stack,
  Checkbox } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Stack,
    Checkbox
  },
  data () {
    return {
      inputValue: 'Default value',
      shouldShowPassword: false,
      isChecked: false
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
