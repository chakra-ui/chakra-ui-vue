<template>
  <c-theme-provider>
    <c-reset />
    <%_ if (hasVueRouter) { _%>
    <router-view />
    <%_ } else { _%>
    <!--Your application goes here -->
    <%_ } _%>
  </c-theme-provider>
</template>

<script>
<%_ if (!hasChakraLoader) { _%>
import { CThemeProvider, CReset } from "@chakra-ui/vue";
 <%_ } _%>

export default {
  name: "App",
  <%_ if (!hasChakraLoader) { _%>
  components: {
    CThemeProvider,
    CReset
  }
   <%_ } _%>
};
</script> 