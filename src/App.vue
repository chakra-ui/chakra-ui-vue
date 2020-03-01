<template>
  <div>
    <Checkbox v-model="isChecked">
      Checkbox
    </Checkbox>
  </div>
</template>

<script lang="js">
import {
  Checkbox } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
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
