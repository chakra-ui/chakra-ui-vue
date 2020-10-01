<template>
  <c-grid
    :template-columns="['1fr', '1fr', '1fr', '3fr 300px']"
    align-items="start"
  >
    <c-box
      font-size="sm"
      max-w="100%"
      rounded="md"
      overflow="hidden"
      :mr="[0, 0, 5]"
      :mb="[5, 5, 0]"
    >
      <prism-editor v-model="code" :readonly="true" language="vue" />
    </c-box>
    <c-box w="100%" shadow="md" rounded="lg" p="5">
      <c-image rounded="md" w="100%" src="https://bit.ly/2k1H1t6" />
      <c-flex align="baseline" mt="2">
        <c-badge variant-color="pink">
          Plus
        </c-badge>
        <c-text
          ml="2"
          text-transform="uppercase"
          font-size="sm"
          font-weight="bold"
          color="pink.800"
        >
          Verified &bull; Cape Town
        </c-text>
      </c-flex>
      <c-text mt="2" font-size="xl" font-weight="semibold" line-height="short">
        Modern, Chic Penthouse with Mountain, City & Sea Views
      </c-text>
      <c-text mt="2">
        $119/night
      </c-text>
      <c-flex mt="2" align="center">
        <c-icon name="star" color="orange.400" />
        <c-text ml="1" font-size="sm">
          <b>4.84</b> (190)
        </c-text>
      </c-flex>
    </c-box>
  </c-grid>
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import 'prismjs'
import '~/css/night-owl.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'

import { CFlex, CText, CBox, CBadge, CIcon, CGrid, CImage } from '@chakra-ui/vue'
export default {
  name: 'Example',
  components: {
    CFlex,
    CText,
    CBox,
    CBadge,
    CIcon,
    CGrid,
    CImage,
    PrismEditor
  },
  data () {
    return {
      code: `
<!-- AirBnB Card Example -->

<template>
  <c-box w="300px" shadow="md" rounded="lg" p="5">
    <c-image rounded="md" src="https://bit.ly/2k1H1t6"/>
    <c-flex align="baseline" mt="2">
      <c-badge variant-color="pink">Plus</c-badge>
      <c-text
        ml="2"
        text-transform="uppercase"
        font-size="sm"
        font-weight="bold"
        color="pink.800"
      >
      Verified &bull; Cape Town
      </c-text>
    </c-flex>
    <c-text mt="2" font-size="xl" font-weight="semibold" line-height="short">
      Modern, Chic Penthouse with Mountain, City & Sea Views
    </c-text>
    <c-text mt="2">$119/night</c-text>
    <c-flex mt="2" align="center">
      <c-icon name="star" color="orange.400" />
      <c-text ml="1" font-size="sm"><b>4.84</b> (190)</c-text>
    </c-flex>
  </c-box>
</template>
      `.trim()
    }
  }
}
</script>
