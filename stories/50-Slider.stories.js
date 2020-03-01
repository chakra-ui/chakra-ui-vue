import { storiesOf } from '@storybook/vue'
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '../packages/kiwi-core/src'

storiesOf('UI | Slider', module)
  .add('Basic Usage', () => ({
    components: { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb },
    template: `
      <Box w="300px">
        <Slider :defaultValue="30">
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </Box>
    `
  }))
