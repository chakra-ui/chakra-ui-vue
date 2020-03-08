import { storiesOf } from '@storybook/vue'
import { CSSReset, CircularProgress, CircularProgressLabel, Button } from '../packages/chakra-ui-core/src'

storiesOf('UI | CircularProgress', module)
  .add('default circular progress', () => ({
    components: { CSSReset, CircularProgress, CircularProgressLabel, Button },
    template: `
      <div>
        <CSSReset />
        <CircularProgress :value="60" />
      </div>
    `
  }))
  .add('with label', () => ({
    components: { CSSReset, CircularProgress, CircularProgressLabel, Button },
    template: `
      <div>
        <CSSReset />
        <CircularProgress :value="value">
          <CircularProgressLabel>{{ value }}%</CircularProgressLabel>
        </CircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With size', () => ({
    components: { CSSReset, CircularProgress, CircularProgressLabel, Button },
    template: `
      <div>
        <CSSReset />
        <CircularProgress size="120px" :value="value">
          <CircularProgressLabel>{{ value }}%</CircularProgressLabel>
        </CircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With color', () => ({
    components: { CSSReset, CircularProgress, CircularProgressLabel, Button },
    template: `
      <div>
        <CSSReset />
        <CircularProgress size="120px" color="blue" :value="value">
          <CircularProgressLabel>{{ value }}%</CircularProgressLabel>
        </CircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With thickness', () => ({
    components: { CSSReset, CircularProgress, CircularProgressLabel, Button },
    template: `
      <div>
        <CSSReset />
        <CircularProgress size="120px" :thickness="0.1" :value="value">
          <CircularProgressLabel>{{ value }}%</CircularProgressLabel>
        </CircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
