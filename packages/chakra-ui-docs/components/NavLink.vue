<template>
  <NuxtLink :class="linkClass" :to="to">
    <slot />
  </NuxtLink>
</template>

<script>
import { css } from 'emotion'
import { systemProps } from '@chakra-ui/vue/src/Box'
import { baseProps } from '@chakra-ui/vue/src/config'
import { forwardProps } from '@chakra-ui/vue/src/utils'

export default {
  props: {
    ...baseProps,
    to: String
  },
  computed: {
    linkClass () {
      const { to, ...rest } = this.$props
      return css(systemProps(forwardProps(rest)))
    }
  }
}
</script>
