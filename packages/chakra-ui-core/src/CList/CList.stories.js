import { storiesOf } from '@storybook/vue'
import { CBox, CList, CListItem, CListIcon } from '..'

storiesOf('UI | List', module)
  .add('Basic Usage', () => ({
    components: { CBox, CList, CListItem, CListIcon },
    template: `
      <CBox w="600px">
        <CList spacing="3">
          <CListItem>
            <CListIcon icon="check-circle" color="green.500" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </CListItem>
          <CListItem>
            <CListIcon icon="check-circle" color="green.500" />
            Assumenda, quia temporibus eveniet a libero incidunt suscipit
          </CListItem>
          <CListItem>
            <CListIcon icon="check-circle" color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </CListItem>
          <CListItem>
            <CListIcon icon="cog" color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </CListItem>
        </CList>
      </CBox>
    `
  }))
