import { storiesOf } from '@storybook/vue'
import { CReset, CCircularProgress, CCircularProgressLabel, CButton } from '..'

storiesOf('UI | CircularProgress', module)
  .add('default circular progress', () => ({
    components: { CReset, CCircularProgress, CCircularProgressLabel, CButton },
    template: `
      <div>
        <CReset />
        <CCircularProgress :value="60" />
      </div>
    `
  }))
  .add('with label', () => ({
    components: { CReset, CCircularProgress, CCircularProgressLabel, CButton },
    template: `
      <div>
        <CReset />
        <CCircularProgress :value="value">
          <CCircularProgressLabel>{{ value }}%</CCircularProgressLabel>
        </CCircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With size', () => ({
    components: { CReset, CCircularProgress, CCircularProgressLabel, CButton },
    template: `
      <div>
        <CReset />
        <CCircularProgress size="120px" :value="value">
          <CCircularProgressLabel>{{ value }}%</CCircularProgressLabel>
        </CCircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With color', () => ({
    components: { CReset, CCircularProgress, CCircularProgressLabel, CButton },
    template: `
      <div>
        <CReset />
        <CCircularProgress size="120px" color="blue" :value="value">
          <CCircularProgressLabel>{{ value }}%</CCircularProgressLabel>
        </CCircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
  .add('With thickness', () => ({
    components: { CReset, CCircularProgress, CCircularProgressLabel, CButton },
    template: `
      <div>
        <CReset />
        <CCircularProgress size="120px" :thickness="0.1" :value="value">
          <CCircularProgressLabel>{{ value }}%</CCircularProgressLabel>
        </CCircularProgress>
      </div>
    `,
    data () {
      return {
        value: 60
      }
    }
  }))
