import { storiesOf } from '@storybook/vue'
import { CBox, CFlex, CDivider } from '..'

storiesOf('UI | Divider', module)
  .add('Basic usage', () => ({
    components: { CFlex, CDivider },
    template: `
    <c-flex>
      <span>Part 1</span>
      <c-divider orientation="vertical" />
      <span>Part 2</span>
    </c-flex>
    `
  }))
  .add('changing border color', () => ({
    components: { CBox, CDivider },
    template: `
      <c-box>
        <span>Part 1</span>
        <c-divider border-color="red.200" />
        <span>Part 2</span>
      </c-box>
    `
  }))