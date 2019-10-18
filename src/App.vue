<template>
  <theme-provider :theme="theme">
    {{ state.greeting }}
    <Button variant="ghost" color="success" size="lg" @click="increment">{{ state.buttonText }}</Button>
    <br>
    <h1>{{ state.count }}</h1>
    <br>
    <Box
      :w="['auto']"
      px="5"
      py="5"
      shadow="lg"
      my="5"
      mb="5"
      rounded="sm"
      background-color="yellow.200"
      color="yellow.700"
    >
      This is the new box component
    </Box>
    <Box
      @click="increment"
      w="auto"
      background-color="indigo.700"
      shadow="md"
      px="4"
      py="4"
      rounded="lg"
      d="flex"
      color="indigo.100"
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis incidunt dolor impedit facilis doloribus accusamus aspernatur autem amet voluptate aliquid asperiores, repellendus tempora reiciendis. Aliquid sunt quasi rem magnam, voluptate cumque libero necessitatibus ut minima numquam fugiat? Blanditiis unde earum sint labore quidem quod adipisci quae incidunt dolorum rerum, laboriosam ipsa consectetur, laborum dolore porro quaerat debitis iusto qui pariatur dicta! Quo ab exercitationem possimus, facere vero perferendis quam illum expedita dolores qui tenetur voluptatem sequi eos reprehenderit ut excepturi, ratione nostrum dolor officia labore quis? Dolor, beatae! Eaque autem vero libero. Veritatis placeat blanditiis error, deleniti autem ab quaerat?
    </Box>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import Button from './components/Button'
import Box from './components/Box'
import theme from './lib/theme'
import { useIncrement } from './use-increment'

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
    Box
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
