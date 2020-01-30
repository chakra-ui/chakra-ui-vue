import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Menu, MenuGroup, MenuButton, MenuList, MenuItem, MenuDivider } from '../packages/kiwi-core/src'

storiesOf('UI | Menu', module)
  .addDecorator(centered)
  .add('Default Menu', () => ({
    components: { Menu, MenuGroup, MenuButton, MenuList, MenuItem, MenuDivider },
    template: `
    <Menu>
      <MenuButton as={Button} rightIcon="chevron-down">
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem as="a" href="#">
          Attend a Workshop
        </MenuItem>
      </MenuList>
    </Menu>
    `
  }))
  .add('With internal state', () => ({
    components: { Menu, MenuGroup, MenuButton, MenuList, MenuItem, MenuDivider },
    template: `
      <Menu v-slot="{ isOpen }">
        <MenuButton right-icon="chevron-down" variantColor="pink">
          {{ isOpen ? 'Close' : 'Open' }}
        </MenuButton>
        <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
      </Menu>
    `
  }))
  .add('With letter navigation', () => ({
    components: { Menu, MenuGroup, MenuButton, MenuList, MenuItem, MenuDivider },
    template: `
    <Menu>
      <MenuButton
        px="4"
        py="2"
        transition="all 0.2s"
        rounded="md"
        borderWidth="1px"
        :_hover="{ bg: 'gray.100' }"
        :_expanded="{ bg: 'red.200' }"
        :_focus="{ outline: 0, boxShadow: 'outline' }"
      >
        File <Icon name="chevron-down" />
      </MenuButton>
      <MenuList>
        <MenuItem>New File</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuDivider />
        <MenuItem>Open...</MenuItem>
        <MenuItem>Save File</MenuItem>
      </MenuList>
    </Menu>
    `
  }))
