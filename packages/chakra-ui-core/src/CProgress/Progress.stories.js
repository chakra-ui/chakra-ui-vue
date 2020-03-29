import { storiesOf } from '@storybook/vue'
import { CSSReset, Progress as KProgress, Stack, Box } from '..'

storiesOf('UI | Progress', module)
  .addDecorator(story => ({
    components: { CSSReset, Box, story: story() },
    template: `
      <Box w="full" maxWidth="400px" mx="auto" mt="8" p="3">
        <CSSReset></CSSReset>
        <story></story>
      </Box>`
  }))

  .add('Default Progress', () => ({
    components: { KProgress },
    template: `<KProgress :value="80" />`
  }))
  .add('With stripe', () => ({
    components: { KProgress },
    template: `<KProgress hasStripe :value="64" />`
  }))
  .add('With sizes', () => ({
    components: { KProgress, Stack },
    template: `
      <Stack :spacing="5">
        <KProgress rounded="sm" color="green" size="sm" />
        <KProgress color="green" size="md" />
        <KProgress color="green" size="lg" />
        <KProgress color="green" height="32px" />
      </Stack>`
  }))
  .add('With color', () => ({
    components: { KProgress },
    template: `<KProgress color="pink" hasStripe />`
  }))
