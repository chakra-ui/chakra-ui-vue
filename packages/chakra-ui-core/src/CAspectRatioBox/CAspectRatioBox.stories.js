import { storiesOf } from '@storybook/vue'
import { CAspectRatioBox, CBox } from '..'

storiesOf('UI | AspectRatioBox', module)
  .add('Basic Usage', () => ({
    components: { CAspectRatioBox, CBox },
    template: `
      <div style="width: 100vh; height: 100vw;">
        <CAspectRatioBox maxW="560px" :ratio="1">
          <CBox
            as="iframe"
            title="naruto"
            src="https://www.youtube.com/embed/QhBnZ6NPOY0"
            allowFullScreen
          />
        </CAspectRatioBox>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
