import { storiesOf } from '@storybook/vue'
import { Image as KImage } from '../packages/chakra-ui-core/src'

storiesOf('UI | Image', module)
  .add('Basic Usage', () => ({
    components: { KImage },
    template: `
      <KImage
        shadow="sm"
        htmlWidth="100px"
        src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4"
      />
    `
  }))
