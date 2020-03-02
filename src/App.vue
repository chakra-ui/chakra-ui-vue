<template>
  <Box>
    <Breadcrumb :add-separator="false">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Breadcrumb 1</BreadcrumbLink>
        <BreadcrumbSeparator color="tomato" font-size="10px" font-weight="bold" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
        <BreadcrumbSeparator color="firebrick" font-size="20px" font-weight="bold" />
      </BreadcrumbItem>
    </Breadcrumb>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator
  },
  data () {
    return {
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
  },
  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    },
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>
