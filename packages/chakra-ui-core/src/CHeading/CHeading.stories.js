import { storiesOf } from '@storybook/vue'
import { CHeading } from '..'

storiesOf('UI | Heading', module)
  .add('Basic Usage', () => ({
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
  .add('Is truncated', () => ({
    components: { CHeading },
    template: `
      <div style="width: 80vw;">
        <CHeading isTruncated size="2xl">Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.</CHeading>
      </div>
    `
  }))
