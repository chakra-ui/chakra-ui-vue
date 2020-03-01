<template>
  <div>
    <Select
      backgroundColor="tomato"
      borderColor="tomato"
      color="white"
      placeholder="Woohoo! A new background color!"
    />
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
