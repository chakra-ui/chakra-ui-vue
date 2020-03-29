import { storiesOf } from '@storybook/vue'
import { CBox } from '..'

storiesOf('UI | Box', module)
  .add('Box', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          :w="['auto']"
          px="5"
          py="5"
          shadow="lg"
          my="5"
          mb="5"
          rounded="sm"
          font-family="body"
          background-color="blue.200"
          color="blue.700"
        >
          This is box component
        </CBox>
      </div>
    `
  }))
