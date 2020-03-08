import { storiesOf } from '@storybook/vue'
import { CSSReset, Grid, Box } from '../packages/chakra-ui-core/src'

storiesOf('UI | Grid', module)
  .add('Default Grid', () => ({
    components: { CSSReset, Grid, Box },
    template: `
      <div>
        <CSSReset />
        <Grid w="600px" template-columns="repeat(5, 1fr)" gap="6">
          <Box w="100%" h="10" bg="blue.500" />
          <Box w="100%" h="10" bg="blue.500" />
          <Box w="100%" h="10" bg="blue.500" />
          <Box w="100%" h="10" bg="blue.500" />
          <Box w="100%" h="10" bg="blue.500" />
        </Grid>
      </div>
    `
  }))
