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
  .add('Box with custom values', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          w="300px"
          h="200px"
          font-family="body"
          objectFit="contain"
          bgImg="url(https://res.cloudinary.com/xtellar/image/upload/c_scale,w_400/v1590590033/chakra-ui/docs/eye-for-ebony-vYpbBtkDhNE-unsplash_si32tg.jpg)"
          bgSize="cover"
        >
          <CBox h="full" bg="red.400" w="50%" p="4" color="white" line-height="1">
            <CBox fontWeight="bold" fontSize="2xl" >
              The Rise of Africa's pearl
            </CBox>
            <CBox mt="3" fontSize="lg">
              Here is Miss Uganda's story.
            </CBox>
          </CBox>
        </CBox>
      </div>
    `
  }))
