import { storiesOf } from '@storybook/vue'
import { CSpinner, CStack } from '..'

const components = { CSpinner, CStack }

storiesOf('UI | Spinner', module)
  .add('Basic Usage', () => ({
    components,
    template: `
      <c-spinner />
    `
  }))
  .add('With color', () => ({
    components,
    template: `
      <c-spinner color="blue.500" />
    `
  }))
  .add('With size', () => ({
    components,
    template: `
    <c-stack is-inline :spacing="4">
      <c-spinner size="xs" />
      <c-spinner size="sm" />
      <c-spinner size="md" />
      <c-spinner size="lg" />
      <c-spinner size="xl" />
    </c-stack>
    `
  }))
  .add('With empty color area', () => ({
    components,
    template: `
      <c-spinner
        thickness="4px"
        speed="0.65s"
        empty-color="green.200"
        color="vue.500"
        size="xl"
      />
    `
  }))
