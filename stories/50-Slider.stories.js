import { storiesOf } from '@storybook/vue'
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Icon } from '../packages/kiwi-core/src'

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
  .add('Customized Slider', () => ({
    components: { Box, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb },
    template: `
      <Box w="300px">
        <Slider :defaultValue="30">
          <SliderTrack bg="red.100" />
          <SliderFilledTrack bg="tomato" />
          <SliderThumb p="3" d="flex" alignItems="center" justifyContent="center">
            <Icon name="coffee" color="tomato" />
          </SliderThumb>
        </Slider>
      </Box>
    `
  }))
