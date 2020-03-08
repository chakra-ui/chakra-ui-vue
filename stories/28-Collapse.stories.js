import { storiesOf } from '@storybook/vue'
import { Button, Collapse, Box } from '../packages/chakra-ui-core/src'

storiesOf('UI | Collapse', module)
  .add('Basic Usage', () => ({
    components: { Button, Collapse, Box },
    template: `
      <div>
        <Button @click="showCollapsed = !showCollapsed">Collapse</Button>
        <Collapse :isOpen="showCollapsed">
          <Box bg="tomato" w="250px">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae officia rem mollitia molestias eveniet, reiciendis perspiciatis minima deleniti iure voluptates laborum vel accusamus enim officiis dolorum necessitatibus, animi perferendis reprehenderit!
          </Box>
        </Collapse>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
  .add('Changing the startingHeigh', () => ({
    components: { Button, Collapse, Box },
    template: `
      <div>
        <Button @click="showCollapsed = !showCollapsed">Collapse</Button>
        <Collapse :isOpen="showCollapsed" :startingHeight="24">
          <Box bg="tomato" w="250px">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae officia rem mollitia molestias eveniet, reiciendis perspiciatis minima deleniti iure voluptates laborum vel accusamus enim officiis dolorum necessitatibus, animi perferendis reprehenderit!
          </Box>
        </Collapse>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
