<template>
  <theme-provider :theme="theme">
    {{ incrementState.greeting }}
    <Button variant="ghost" color="success" size="lg" @click="increment">{{ incrementState.buttonText }}</Button>
    <br>
    <h1>{{ incrementState.count }}</h1>
    <br>
    <Box bg="yellow.200" border-left="4px" font-family="body" rounded="md" mb="5" shadow="md" p="3" color="yellow.800">
      <Box font-family="heading" font-size="3xl" mb="2">Random Title</Box>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis incidunt dolor impedit facilis doloribus accusamus aspernatur autem amet voluptate aliquid asperiores, repellendus tempora reiciendis. Aliquid sunt quasi rem magnam, voluptate cumque libero necessitatibus ut minima numquam fugiat? Blanditiis unde earum sint labore quidem quod adipisci quae incidunt dolorum rerum, laboriosam ipsa consectetur, laborum dolore porro quaerat debitis iusto qui pariatur dicta! Quo ab exercitationem possimus, facere vero perferendis quam illum expedita dolores qui tenetur voluptatem sequi eos reprehenderit ut excepturi, ratione nostrum dolor officia labore quis? Dolor, beatae! Eaque autem vero libero. Veritatis placeat blanditiis error, deleniti autem ab quaerat?
    </Box>
    <PseudoBox
      bg="teal.300"
      color="teal.800"
      p="3"
      rounded="md"
      bl="4px"
      font-family="body"
      transition="all 0.2s ease-in-out"
      :_hover="{
        bg: 'red.200',
        color: 'red.700'
      }"
      :_focus="{
        bg: 'indigo.200',
        color: 'indigo.700'
      }"
    >
      Pseudobox here
    </PseudoBox>
    <Box
      rounded="md"
      overflow="hidden"
      mt="4"
    >
      <PseudoBox
        v-for="(box, index) in boxes"
        :key="index"
        px="4"
        py="2"
        bg="white"
        :_hover="{ opacity: '80%' }"
        :_odd="{ bg: 'gray.100' }"
        >
        {{ box.name }}
      </PseudoBox>
    </Box>
  </theme-provider>
</template>

<script>
import ThemeProvider from './components/ThemeProvider'
import Button from './components/Button'
import { Box, PseudoBox } from './lib/core/'
import theme from './lib/theme'
import { useIncrement } from './use-increment'
import { reactive } from '@vue/composition-api'

export default {
  setup () {
    const { state: incrementState, increment } = useIncrement()
    const state = reactive({
      boxes: [
        {
          id: 1,
          name: 'Box 1'
        },
        {
          id: 2,
          name: 'Box 2'
        },
        {
          id: 3,
          name: 'Box 3'
        }
      ]
    })
    return {
      ...state,
      incrementState,
      increment,
      theme
    }
  },
  name: 'App',
  components: {
    Button,
    ThemeProvider,
    Box,
    PseudoBox
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
