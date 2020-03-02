<template>
  <Box w="300px">
    <CheckboxGroup v-model="selectedValues" variantColor="green" :defaultValue="['two']">
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </CheckboxGroup>
    <MModal :isOpen="isOpen">
      <Box>
        <Button>InitialFocusRef</Button>
      </Box>
    </MModal>
  </Box>
</template>

<script lang="js">
import {
  Checkbox,
  CheckboxGroup,
  Box,
  Button,
  MModal } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Checkbox,
    CheckboxGroup,
    Box,
    Button,
    MModal
  },
  data () {
    return {
      checkedItems: [false, false],
      selectedValues: ['two'],
      isOpen: false
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
  mounted () {
    setInterval(() => {
      this.isOpen = !this.isOpen
    }, 4000)
  },
  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    }
  }
}
</script>
