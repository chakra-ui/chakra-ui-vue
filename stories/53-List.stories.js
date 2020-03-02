import { storiesOf } from '@storybook/vue'
import { Box, List, ListItem, ListIcon } from '../packages/kiwi-core/src'

storiesOf('UI | List', module)
  .add('Basic Usage', () => ({
    components: { Box, List, ListItem, ListIcon },
    template: `
      <Box w="600px">
        <List spacing="3">
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </ListItem>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Assumenda, quia temporibus eveniet a libero incidunt suscipit
          </ListItem>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </ListItem>
          <ListItem>
            <ListIcon icon="cog" color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </ListItem>
        </List>
      </Box>
    `
  }))
