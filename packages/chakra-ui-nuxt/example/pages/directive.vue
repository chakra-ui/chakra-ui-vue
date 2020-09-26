<template>
  <div>
    <div
      v-chakra
      p="3"
      bg="red.100"
      rounded="md"
      color="red.500"
      font-weight="bold"
    >
      Welcome to Chakra directive
    </div>
    <div>
      <div
        v-chakra="{
          p: 3,
          shadow: 'sm',
          h1: {
            bg: 'blue.100'
          },
        }"
      >
        <h1>Title</h1>
        <p>Text</p>
      </div>
    </div>
    <div
      v-chakra="theme => ({
        shadow: 'sm',
        bg: theme.colors.blue[800],
        color: theme.colors.yellow[300],
        p: {
          fontWeight: 'bold',
          p: 3
        }
      })"
    >
      <p>Computed styles</p>
    </div>
    <div>
      <button
        v-chakra="{
          ':hover': { bg: 'green.400' },
          ':focus': { shadow: 'outline' }
        }"
        font-weight="bold"
        px="4"
        py="3"
        color="white"
        rounded="md"
        bg="blue.400"
        outline="none"
      >
        Button
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directive'
}
</script>
