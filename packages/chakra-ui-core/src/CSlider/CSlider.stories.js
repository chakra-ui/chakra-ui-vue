import { storiesOf } from '@storybook/vue'
import { CBox, CSlider, CSliderTrack, CSliderFilledTrack, CSliderThumb, CIcon } from '..'

storiesOf('UI | Slider', module)
  .add('Basic Usage', () => ({
    components: { CBox, CSlider, CSliderTrack, CSliderFilledTrack, CSliderThumb },
    template: `
      <CBox w="300px">
        <CSlider :defaultValue="30">
          <CSliderTrack />
          <CSliderFilledTrack />
          <CSliderThumb />
        </CSlider>
      </CBox>
    `
  }))
  .add('Customized Slider', () => ({
    components: { CBox, CIcon, CSlider, CSliderTrack, CSliderFilledTrack, CSliderThumb },
    template: `
      <CBox w="300px">
        <CSlider :defaultValue="30">
          <CSliderTrack bg="red.100" />
          <CSliderFilledTrack bg="tomato" />
          <CSliderThumb p="3" d="flex" alignItems="center" justifyContent="center">
            <CIcon name="coffee" color="tomato" />
          </CSliderThumb>
        </CSlider>
      </CBox>
    `
  }))
