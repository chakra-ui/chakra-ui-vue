import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { CSSReset, Progress, Stack } from 'kiwi-core'

storiesOf('UI | Progress', module)
  .addDecorator(centered)
  .add('Default Progress', () => ({
    components: { CSSReset, Progress },
    template: `
      <div>
        <CSSReset />
        <Progress value={80} />
      </div>
    `
  }))
  .add('With stripe', () => ({
    components: { CSSReset, Progress },
    template: `
      <div>
        <CSSReset />
        <Progress hasStripe value={64} />
      </div>
    `
  }))
  .add('With sizes', () => ({
    components: { CSSReset, Progress, Stack },
    template: `
    <div>
    <CSSReset />
        <Stack :spacing="5">
        <Progress rounded="sm" color="green" size="sm" />
        <Progress color="green" size="md" />
        <Progress color="green" size="lg" />
        <Progress color="green" height="32px" />
        </Stack>
        </div>
        `
  }))
  .add('With color', () => ({
    components: { CSSReset, Progress },
    template: `
    <div>
      <CSSReset />
      <Progress color="pink" hasStripe />
    </div>
  `
  }))
