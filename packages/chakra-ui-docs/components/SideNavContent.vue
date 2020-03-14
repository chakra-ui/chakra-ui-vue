<template>
  <Box>
    <Heading size="xs" color="gray.400" letterSpacing="wide" mb="2" textTransform="uppercase">
      Getting Started
    </Heading>
    <NavLink
      v-for="(link, index) in topNavLinks"
      to="/home"
      :key="index"
      d="block"
    >
      {{ link }}
    </NavLink>
  </Box>
</template>

<script>
import { boxProps, Box, Heading } from 'chakra-ui-core'
import NavLink from './NavLink'

const topNavLinks = [
  'Getting Started',
  'Principles',
  'Style Props',
  'Color Mode',
  'Responsive Styles',
  'Theme',
  'Recipes'
]

export default {
  props: {
    contentHeight: {
      type: String,
      default: 'calc(100vh - 4rem)'
    },
    ...boxProps
  },
  components: {
    Box,
    Heading,
    NavLink
  },
  data () {
    return {
      topNavLinks
    }
  }
}
</script>
