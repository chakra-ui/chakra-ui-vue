import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { CSSReset, Progress as KProgress, Stack } from '../packages/kiwi-core/src'

storiesOf('UI | Progress', module)
  .addDecorator(centered)
  .add('Default Progress', () => ({
    components: { CSSReset, KProgress },
    template: `
      <div>
        <CSSReset />
        <KProgress :value="80" />
      </div>
    `
  }))
  .add('With stripe', () => ({
    components: { CSSReset, KProgress },
    template: `
      <div>
        <CSSReset />
        <KProgress hasStripe :value="64" />
      </div>
    `
  }))
  .add('With sizes', () => ({
    components: { CSSReset, KProgress, Stack },
    template: `
      <div>
        <CSSReset />
        <Stack :spacing="5">
          <KProgress rounded="sm" color="green" size="sm" />
          <KProgress color="green" size="md" />
          <KProgress color="green" size="lg" />
          <KProgress color="green" height="32px" />
        </Stack>
      </div>
    `
  }))
  .add('With color', () => ({
    components: { CSSReset, KProgress },
    template: `
    <div>
      <CSSReset />
      <KProgress color="pink" hasStripe />
    </div>
  `
  }))
