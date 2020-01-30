<template>
  <theme-provider :theme="$kiwi.theme" :color-mode="colorMode" :icons="$kiwi.icons">
    <main class="root">
      <Heading mb="50px" as="h1">Chakra-vui Menu</Heading>
      <CSSReset />
      <Anchor is-external href="https://github.com/codebender828/kiwi-ui" color="white" bg="blue.900" px="3" py="2" rounded="md" position="fixed" top="3" right="3" d="flex" align-items="center">
        <Icon name="github" mr="2" size="6" />
        Github
      </Anchor>
      <div class="wrapper">
        <Menu :closeOnSelect="false">
          <MenuButton variantColor="blue">
            MenuItem
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuItemOption value="desc">Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title="Country" type="checkbox">
              <MenuItemOption value="email">Email</MenuItemOption>
              <MenuItemOption value="phone">Phone</MenuItemOption>
              <MenuItemOption value="country">Country</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </div>
    </main>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, Heading, Link as Anchor, Menu, Button, MenuButton, MenuList, MenuDivider, MenuOptionGroup, MenuItemOption, Icon, CSSReset } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Heading,
    ThemeProvider,
    Icon,
    Anchor,
    CSSReset,
    Menu,
    MenuList,
    // MenuItem,
    MenuButton,
    // MenuGroup,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60,
      Button
    }
  },
  methods: {
    logClick () {
      console.log('downloading')
    },
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    showPopper2 () {
      this.show2 = !this.show2
    },
    hidePopper2 () {
      this.show2 = false
    },
    focus (el) {
      setTimeout(() => {
        if (el) {
          if (el instanceof HTMLElement) el.focus()
          else if (el.$el && el.$el.focus) el.$el.focus()
        }
      })
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0
}

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
  }
}
</style>
