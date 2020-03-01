<template>
  <div>
    <Checkbox
      :isChecked="allChecked"
      :isIndeterminate="isIndeterminate"
      @change="(val, $e) => { checkedItems = [$e.target.checked, $e.target.checked] }"
    >
      Parent Checkbox
    </Checkbox>
    <Stack pl="6" mt="1" spacing="1">
      <Checkbox
        :isChecked="checkedItems[0]"
        @change="(val, $e) => { checkedItems = [$e.target.checked, checkedItems[1]] }"
      >
        Child Checkbox 1
      </Checkbox>
      <Checkbox
        :isChecked="checkedItems[1]"
        @change="(val, $e) => { checkedItems = [checkedItems[0], $e.target.checked] }"
      >
        Child Checkbox 2
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
      checkedItems: [false, false]
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    },
    allChecked () {
      return this.checkedItems.every(Boolean)
    },
    isIndeterminate () {
      return this.checkedItems.some(Boolean) && !this.allChecked
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
