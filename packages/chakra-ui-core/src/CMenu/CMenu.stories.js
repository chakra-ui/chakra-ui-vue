import { storiesOf } from '@storybook/vue'
import {
  CMenu,
  CFade,
  CMenuGroup,
  CMenuButton,
  CMenuList,
  CMenuOptionGroup,
  CImage,
  CMenuItemOption,
  CMenuItem,
  CMenuDivider,
  CIcon
} from '..'

storiesOf('UI | Menu', module)
  .add('With internal state', () => ({
    components: {
      CFade,
      CMenu,
      CMenuGroup,
      CMenuButton,
      CMenuList,
      CMenuItem,
      CMenuDivider
    },
    template: `
      <CMenu v-slot="{ isOpen }" :close-on-blur="false">
        <CMenuButton right-icon="chevron-down" variantColor="pink">
          {{ isOpen ? 'Close' : 'Open' }}
        </CMenuButton>
        <CFade>
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
        </CFade>
      </CMenu>
    `
  }))
  .add('With letter navigation', () => ({
    components: {
      CMenu,
      CMenuGroup,
      CMenuButton,
      CMenuList,
      CMenuItem,
      CMenuDivider,
      CIcon
    },
    template: `
    <CMenu>
      <CMenuButton
        px="4"
        py="2"
        transition="all 0.2s"
        rounded="md"
        :_hover="{ bg: 'gray.100' }"
        :_expanded="{ bg: 'red.200' }"
        :_focus="{ outline: 0, boxShadow: 'outline' }"
      >
        File <CIcon name="chevron-down" />
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
    components: {
      CMenu,
      CMenuGroup,
      CMenuButton,
      CMenuList,
      CMenuOptionGroup,
      CMenuItemOption,
      CMenuItem,
      CMenuDivider
    },
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
  .add('Letter navigation', () => ({
    components: {
      CMenu,
      CMenuGroup,
      CMenuButton,
      CImage,
      CMenuList,
      CMenuOptionGroup,
      CMenuItemOption,
      CMenuItem,
      CMenuDivider
    },
    template: `
      <c-menu>
        <c-menu-button as="button" right-icon="chevron-down">
          Your Cats
        </c-menu-button>
        <c-menu-list>
          <c-menu-item h="48px">
            <c-image
              size="2rem"
              rounded="full"
              src="https://placekitten.com/100/100"
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            <span>Fluffybuns the Destroyer</span>
          </c-menu-item>
          <c-menu-item h="40px">
            <c-image
              size="2rem"
              rounded="full"
              src="https://placekitten.com/120/120"
              alt="Simon the pensive"
              mr="12px"
            />
            <span>Simon the pensive</span>
          </c-menu-item>
        </c-menu-list>
      </c-menu>  
    `
  }))
  .add('No close on blur', () => ({
    components: {
      CMenu,
      CMenuGroup,
      CMenuButton,
      CMenuList,
      CMenuItem,
      CMenuDivider,
      CIcon
    },
    template: `
    <CMenu :closeOnBlur="false">
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
