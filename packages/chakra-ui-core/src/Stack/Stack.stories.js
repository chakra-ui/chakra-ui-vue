import { storiesOf } from '@storybook/vue'
import { Heading, Text as KText, Stack, Box } from '..'

storiesOf('UI | Stack', module)
  .add('With vertical stack', () => ({
    components: { Heading, KText, Stack, Box },
    template: `
      <div>
        <Stack spacing="8">
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
    `
  }))
  .add('With horizontal stack', () => ({
    components: { Heading, KText, Stack, Box },
    template: `
      <div>
        <Stack is-inline spacing="8">
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
    `
  }))
