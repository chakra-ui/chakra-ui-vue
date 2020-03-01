<template>
  <Box w="300px">
    <Slider :defaultValue="30">
      <SliderTrack bg="red.100" />
      <SliderFilledTrack bg="tomato" />
      <SliderThumb p="3" d="flex" alignItems="center" justifyContent="center">
        <Icon name="coffee" color="tomato" />
      </SliderThumb>
    </Slider>
  </Box>
</template>

<script lang="js">
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Icon } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Icon
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
