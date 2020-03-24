import { storiesOf } from '@storybook/vue'
import { Box } from '..'

storiesOf('UI | Box', module)
  .add('Box', () => ({
    components: { Box },
    template: `
      <div>
        <Box
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
        </Box>
      </div>
    `
  }))
  .add('Box with custom values', () => ({
    components: { Box },
    template: `
      <div>
        <Box
          w="300px"
          h="200px"
          font-family="body"
          objectFit="contain"
          bgImg="url(https://lh3.googleusercontent.com/proxy/vG0O53R9-vPA2WpuC5lXWCHIVuIQiQ1R7bpQ1UcDsHnHVlz2BJMeSeJx1I1n4huq_SeB39iegxgQl1zXcnNqpq2IJfCgQwwWXpdRG9pNdA)"
        >
          <Box h="full" bg="red.200" :w="1/2" />
        </Box>
      </div>
    `
  }))
