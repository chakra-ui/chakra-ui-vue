<template>
  <Grid
    :templateColumns="['1fr', '1fr', '1fr', '3fr 300px']"
    alignItems="start"
    :p="[10, 10, '150px']"
  >
    <Box fontSize="sm" maxW="100%" rounded="md" overflow="hidden" :mr="[0, 0, 5]" :mb="[5, 5, 0]">
      <prism-editor v-model="code" :readonly="true" language="vue"/>
    </Box>
    <Box w="300px" shadow="md" rounded="lg" p="5">
      <CImage rounded="md" src="https://bit.ly/2k1H1t6"/>
      <Flex align="baseline" mt="2">
        <Badge variantColor="pink">Plus</Badge>
        <CText
          ml="2"
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
        Verified &bull; Cape Town
        </CText>
      </Flex>
      <CText mt="2" fontSize="xl" fontWeight="semibold" lineHeight="short">
        Modern, Chic Penthouse with Mountain, City & Sea Views
      </CText>
      <CText mt="2">$119/night</CText>
      <Flex mt="2" align="center">
        <Icon name="star" color="orange.400" />
        <CText ml="1" fontSize="sm"><b>4.84</b> (190)</CText>
      </Flex>
    </Box>
  </Grid>
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import 'prismjs'
import '~/css/night-owl.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'

import { Flex, Text as CText, Box, Badge, Icon, Grid, Image as CImage } from 'chakra-ui-core'
export default {
  name: 'Example',
  components: {
    CImage,
    Flex,
    CText,
    Badge,
    Box,
    Icon,
    PrismEditor,
    Grid
  },
  data () {
    return {
      code: `
<template>

  <!-- AirBnB Card Example -->

  <Box w="300px" shadow="md" rounded="lg" p="5">
    <CImage rounded="md" src="https://bit.ly/2k1H1t6"/>
    <Flex align="baseline" mt="2">
      <Badge variantColor="pink">Plus</Badge>
      <CText
        ml="2"
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
        color="pink.800"
      >
      Verified &bull; Cape Town
      </CText>
    </Flex>
    <CText mt="2" fontSize="xl" fontWeight="semibold" lineHeight="short">
      Modern, Chic Penthouse with Mountain, City & Sea Views
    </CText>
    <CText mt="2">$119/night</CText>
    <Flex mt="2" align="center">
      <Icon name="star" color="orange.400" />
      <CText ml="1" fontSize="sm"><b>4.84</b> (190)</CText>
    </Flex>
  </Box>
</template>
      `.trim()
    }
  }
}
</script>
