import { storiesOf } from '@storybook/vue'
import { CBox, CList, CListItem, CListIcon } from '..'

storiesOf('UI | List', module)
  .add('Basic Usage', () => ({
    components: { CBox, CList, CListItem, CListIcon },
    template: `
      <div
        v-chakra="{
          maxWidth: ['300px', '600px']
        }"
        px="10"
        py="5"
        border="5px solid"
        border-color="green.200"
        rounded="lg"
        shadow="lg"
      >
        <CList spacing="3">
          <CListItem>
            <CListIcon icon="check-circle" color="green.300" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </CListItem>
          <CListItem>
            <CListIcon icon="check-circle" color="green.300" />
            Assumenda, quia temporibus eveniet a libero incidunt suscipit
          </CListItem>
          <CListItem>
            <CListIcon icon="check-circle" color="green.300" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </CListItem>
          <CListItem>
            <CListIcon icon="cog" color="green.300" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </CListItem>
        </CList>
      </div>
    `
  }))
