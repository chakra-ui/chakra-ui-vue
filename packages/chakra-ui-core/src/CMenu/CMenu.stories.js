import { storiesOf } from '@storybook/vue'
import { CMenu, CMenuGroup, CMenuButton, CMenuList, CMenuOptionGroup, CMenuItemOption, CMenuItem, CMenuDivider, Icon } from '..'

storiesOf('UI | Menu', module)
  .add('Default Menu', () => ({
    components: { CMenu, CMenuGroup, CMenuButton, CMenuList, CMenuItem, CMenuDivider, Icon },
    template: `
    <CMenu>
      <CMenuButton as="Button" rightIcon="chevron-down">
        Actions
      </CMenuButton>
      <CMenuList>
        <CMenuItem>Download</CMenuItem>
        <CMenuItem>Create a Copy</CMenuItem>
        <CMenuItem>Mark as Draft</CMenuItem>
        <CMenuItem>Delete</CMenuItem>
        <CMenuItem as="a" href="#">
          Attend a Workshop
        </CMenuItem>
      </CMenuList>
    </CMenu>
    `
  }))
  .add('With internal state', () => ({
    components: { CMenu, CMenuGroup, CMenuButton, CMenuList, CMenuItem, CMenuDivider },
    template: `
      <CMenu v-slot="{ isOpen }">
        <CMenuButton right-icon="chevron-down" variantColor="pink">
          {{ isOpen ? 'Close' : 'Open' }}
        </CMenuButton>
        <CMenuList>
        <CMenuGroup title="Profile">
          <CMenuItem>My Account</CMenuItem>
          <CMenuItem>Payments </CMenuItem>
        </CMenuGroup>
        <CMenuDivider />
        <CMenuGroup title="Help">
          <CMenuItem>Docs</CMenuItem>
          <CMenuItem>FAQ</CMenuItem>
        </CMenuGroup>
      </CMenuList>
      </CMenu>
    `
  }))
  .add('With letter navigation', () => ({
    components: { CMenu, CMenuGroup, CMenuButton, CMenuList, CMenuItem, CMenuDivider, Icon },
    template: `
    <CMenu>
      <CMenuButton
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
      </CMenuButton>
      <CMenuList>
        <CMenuItem>New File</CMenuItem>
        <CMenuItem>New Window</CMenuItem>
        <CMenuDivider />
        <CMenuItem>Open...</CMenuItem>
        <CMenuItem>Save File</CMenuItem>
      </CMenuList>
    </CMenu>
    `
  }))
  .add('With Menu Options', () => ({
    components: { CMenu, CMenuGroup, CMenuButton, CMenuList, CMenuOptionGroup, CMenuItemOption, CMenuItem, CMenuDivider },
    template: `
      <CMenu :closeOnSelect="false">
        <CMenuButton variantColor="blue">
          MenuItem
        </CMenuButton>
        <CMenuList minWidth="240px">
          <CMenuOptionGroup defaultValue="asc" title="Order" type="radio">
            <CMenuItemOption value="asc">Ascending</CMenuItemOption>
            <CMenuItemOption value="desc">Descending</CMenuItemOption>
          </CMenuOptionGroup>
          <CMenuDivider />
          <CMenuOptionGroup title="Country" type="checkbox">
            <CMenuItemOption value="email">Email</CMenuItemOption>
            <CMenuItemOption value="phone">Phone</CMenuItemOption>
            <CMenuItemOption value="country">Country</CMenuItemOption>
          </CMenuOptionGroup>
        </CMenuList>
      </CMenu>
    `
  }))
