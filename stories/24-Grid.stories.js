import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { CSSReset, Grid, Box } from '../packages/kiwi-core/src'

storiesOf('UI | Grid', module)
  .addDecorator(centered)
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
