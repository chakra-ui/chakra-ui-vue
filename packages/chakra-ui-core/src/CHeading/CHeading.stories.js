import { storiesOf } from '@storybook/vue'
import { CHeading } from '..'

storiesOf('UI | Heading', module)
  .add('Button Group', () => ({
    components: { CHeading },
    template: `
      <div>
        <CHeading size="2xl">Heading 1 </CHeading>
        <CHeading size="xl">Heading 2 </CHeading>
        <CHeading size="lg">Heading 3 </CHeading>
        <CHeading size="md">Heading 4 </CHeading>
        <CHeading size="sm">Heading 5 </CHeading>
        <CHeading size="xs">Heading 6 </CHeading>
      </div>
    `
  }))
