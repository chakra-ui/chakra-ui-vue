<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <CSSReset />
      <div class="wrapper">
        <Breadcrumb :add-separator="false">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Breadcrumb 1</BreadcrumbLink>
            <BreadcrumbSeparator color="tomato" font-size="10px" font-weight="bold" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
            <BreadcrumbSeparator color="firebrick" font-size="20px" font-weight="bold" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, CSSReset, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from 'kiwi-core'

export default {
  name: 'App',
  components: {
    ThemeProvider,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    CSSReset
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    open (params) {
      this.isOpen = true
    },
    close (params) {
      this.isOpen = false
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
  }
}
</style>
