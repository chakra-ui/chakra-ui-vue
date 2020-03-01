<template>
  <div>
    <Select placeholder="Select option">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  </div>
</template>

<script lang="js">
import {
  Select } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Select
  },
  data () {
    return {
      checkedItems: [false, false]
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
