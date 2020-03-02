<template>
  <Box>
    <Tabs>
      <TabList>
        <Tab>Tabs 1</Tab>
        <Tab>Tabs 2</Tab>
        <Tab>Tabs 3</Tab>
      </TabList>
    </Tabs>
  </Box>
</template>

<script lang="js">
import {
  Box,
  Tabs,
  TabList,
  Tab } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Box,
    Tabs,
    TabList,
    Tab
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  methods: {
    showToast () {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
    },
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
