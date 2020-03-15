import { storiesOf } from '@storybook/vue'
import { AspectRatioBox, Box } from '..'

storiesOf('UI | AspectRatioBox', module)
  .add('Basic Usage', () => ({
    components: { AspectRatioBox, Box },
    template: `
      <div style="width: 100vh; height: 100vw;">
        <AspectRatioBox maxW="560px" :ratio="1">
          <Box
            as="iframe"
            title="naruto"
            src="https://www.youtube.com/embed/QhBnZ6NPOY0"
            allowFullScreen
          />
        </AspectRatioBox>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
