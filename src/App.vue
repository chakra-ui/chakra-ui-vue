<template>
  <div>
      <Box mb="3">
        <Tag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size" mx="1" variantColor="green">
          <TagIcon icon="add" size="12px" />
          <TagLabel>Green</TagLabel>
        </Tag>
      </Box>
      <!-- With right Icon -->

      <Box mb="3">
        <Tag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'indigo'" mx="1" variantColor="indigo">
          <TagLabel>Green</TagLabel>
          <TagIcon icon="sun" size="12px" />
        </Tag>
      </Box>

      <!-- With close button -->
      <Box mb="3">
        <Tag rounded="full" v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'cyan'" mx="1" variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton icon="sun" size="12px" />
        </Tag>
      </Box>

      <!-- With custom element -->
      <Box mb="3">
        <Tag rounded="full" mx="1" variantColor="red">
          <Avatar
            name="Jonathan Bakebwa"
            size="xs"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
            :ml="-2"
            :mr="2"
           />
          <TagLabel>Jonathan</TagLabel>
        </Tag>
      </Box>
  </div>
</template>

<script lang="js">
import {
  Box,
  Tag,
  TagLabel,
  TagIcon,
  TagCloseButton,
  Avatar } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Tag,
    TagLabel,
    TagIcon,
    Box,
    TagCloseButton,
    Avatar
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
