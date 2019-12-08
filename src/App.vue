<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <Stack w="600px" is-inline spacing="8">
          <Box p="5" shadow="md" border-width="1px">
            <Heading font-size="xl">Plan Money</Heading>
            <KText mt="4">The future can be even brighter but a goal without a plan is just a wish</KText>
          </Box>
          <Box p="5" shadow="md" border-width="1px">
            <Heading font-size="xl">Save Money</Heading>
            <KText mt="4">You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process</KText>
          </Box>
        </Stack>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Heading, Text as KText, Stack, Box } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Heading,
    KText,
    Stack,
    Box
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0
}

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
