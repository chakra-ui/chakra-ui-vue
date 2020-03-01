<template>
  <Box w="300px">
    <CheckboxGroup v-model="selectedValues" variantColor="green" :defaultValue="['two']">
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </CheckboxGroup>
  </Box>
</template>

<script lang="js">
import {
  Checkbox,
  CheckboxGroup,
  Box } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Checkbox,
    CheckboxGroup,
    Box
  },
  data () {
    return {
      checkedItems: [false, false],
      selectedValues: ['two']
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
