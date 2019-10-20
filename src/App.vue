<template>
  <theme-provider :theme="theme">
    {{ state.greeting }}
    <Button variant="ghost" color="success" size="lg" @click="increment">{{ state.buttonText }}</Button>
    <br>
    <h1>{{ state.count }}</h1>
    <br>
    <Box
      :w="['auto', '50%']"
      px="5"
      py="5"
      shadow="lg"
      my="5"
      mb="5"
      rounded="sm"
      background-color="blue.200"
      border-left="4px"
      color="blue.700"
      font-family="body"
    >
      This is box component
    </Box>
    <Box bg="yellow.200" border-left="4px" font-family="body" rounded="md" shadow="md" p="3" color="yellow.800">
      <Box font-family="heading" font-size="3xl" mb="2">Random Title</Box>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis incidunt dolor impedit facilis doloribus accusamus aspernatur autem amet voluptate aliquid asperiores, repellendus tempora reiciendis. Aliquid sunt quasi rem magnam, voluptate cumque libero necessitatibus ut minima numquam fugiat? Blanditiis unde earum sint labore quidem quod adipisci quae incidunt dolorum rerum, laboriosam ipsa consectetur, laborum dolore porro quaerat debitis iusto qui pariatur dicta! Quo ab exercitationem possimus, facere vero perferendis quam illum expedita dolores qui tenetur voluptatem sequi eos reprehenderit ut excepturi, ratione nostrum dolor officia labore quis? Dolor, beatae! Eaque autem vero libero. Veritatis placeat blanditiis error, deleniti autem ab quaerat?
    </Box>

    <Box bg="red.200" border-left="4px" my="5" rounded="md" shadow="md" p="3" color="red.800">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis incidunt
    </Box>
    <Anchor bg="indigo.200" p="3" bb="4px" rounded="sm">
      Basic Link
    </Anchor>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import Button from './components/Button'
import { Box } from './lib/core/'
import theme from './lib/theme'
import { useIncrement } from './use-increment'

const Anchor = Box.withComponent('a')

export default {
  setup () {
    const { state, increment } = useIncrement()

    return {
      state,
      increment,
      theme
    }
  },
  name: 'App',
  components: {
    Button,
    ThemeProvider,
    Box,
    Anchor
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  font-family: Rubik, sans-serif
}
.top-box {
  margin-bottom: 100px;
}
</style>
