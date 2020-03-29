<template>
  <CGrid
    :templateColumns="['1fr', '1fr', '1fr', '3fr 300px']"
    alignItems="start"
  >
    <CBox fontSize="sm" maxW="100%" rounded="md" overflow="hidden" :mr="[0, 0, 5]" :mb="[5, 5, 0]">
      <prism-editor v-model="code" :readonly="true" language="vue"/>
    </CBox>
    <CBox w="350px" shadow="md" rounded="lg" p="5">
      <CImage rounded="md" w="100%" src="https://bit.ly/2k1H1t6"/>
      <CFlex align="baseline" mt="2">
        <CBadge variantColor="pink">Plus</CBadge>
        <CText
          ml="2"
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
        Verified &bull; Cape Town
        </CText>
      </CFlex>
      <CText mt="2" fontSize="xl" fontWeight="semibold" lineHeight="short">
        Modern, Chic Penthouse with Mountain, City & Sea Views
      </CText>
      <CText mt="2">$119/night</CText>
      <CFlex mt="2" align="center">
        <CIcon name="star" color="orange.400" />
        <CText ml="1" fontSize="sm"><b>4.84</b> (190)</CText>
      </CFlex>
    </CBox>
  </CGrid>
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
    CGrid,
    CImage,
    CFlex,
    CText,
    CBadge,
    CBox,
    CIcon,
    PrismEditor
  },
  data () {
    return {
      code: `
<template>

  <!-- AirBnB Card Example -->

  <CBox w="300px" shadow="md" rounded="lg" p="5">
    <CImage rounded="md" src="https://bit.ly/2k1H1t6"/>
    <CFlex align="baseline" mt="2">
      <CBadge variantColor="pink">Plus</CBadge>
      <CText
        ml="2"
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
        color="pink.800"
      >
      Verified &bull; Cape Town
      </CText>
    </CFlex>
    <CText mt="2" fontSize="xl" fontWeight="semibold" lineHeight="short">
      Modern, Chic Penthouse with Mountain, City & Sea Views
    </CText>
    <CText mt="2">$119/night</CText>
    <CFlex mt="2" align="center">
      <CIcon name="star" color="orange.400" />
      <CText ml="1" fontSize="sm"><b>4.84</b> (190)</CText>
    </CFlex>
  </CBox>
</template>
      `.trim()
    }
  }
}
</script>
