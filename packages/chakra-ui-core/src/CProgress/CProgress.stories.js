import { storiesOf } from '@storybook/vue'
import { CReset, CProgress, CStack, CBox } from '..'

storiesOf('UI | Progress', module)
  .addDecorator(story => ({
    components: { CReset, CBox, story: story() },
    template: `
      <CBox w="full" maxWidth="400px" mx="auto" mt="8" p="3">
        <CReset></CReset>
        <story></story>
      </CBox>`
  }))

  .add('Default Progress', () => ({
    components: { CProgress },
    template: `<CProgress :value="80" />`
  }))
  .add('With stripe', () => ({
    components: { CProgress },
    template: `<CProgress hasStripe :value="64" />`
  }))
  .add('With sizes', () => ({
    components: { CProgress, CStack },
    template: `
      <CStack :spacing="5">
        <CProgress rounded="sm" color="green" size="sm" />
        <CProgress color="green" size="md" />
        <CProgress color="green" size="lg" />
        <CProgress color="green" height="32px" />
      </CStack>`
  }))
  .add('With color', () => ({
    components: { CProgress },
    template: `<CProgress color="pink" hasStripe />`
  }))
