<template>
  <c-box>
    <c-heading as="h1">
      Core contributors
    </c-heading>

    <c-text my="3">
      Special thanks to these people that helped contribute towards Chakra UI Vue.
    </c-text>

    <carbon-ad />

    <c-image :src="require('@/assets/logo/chakra-ui-vue-blue@2x.png')" />

    <c-box>
      <c-box v-for="(person, _i) in contributors" :key="_i" bb="1px solid" border-color="gray.200" p="3">
        <c-text font-weight="bold" mt="3" font-size="1.3rem">
          {{ person.name }} {{ person.nationality }}
        </c-text>
        <c-text font-style="italic">
          {{ person.contributions }}
        </c-text>
        <c-link
          font-size="1.5rem"
          margin-right="3"
          color="black"
          :_hover="{ color: 'vue.400' }"
          is-external
          :href="person.twitter"
        >
          <c-icon name="twitter" />
        </c-link>
        <c-link
          font-size="1.5rem"
          margin-right="3"
          color="black"
          :_hover="{ color: 'vue.400' }"
          is-external
          :href="person.github"
        >
          <c-icon name="github" />
        </c-link>
        <c-link
          font-size="1.5rem"
          margin-right="3"
          color="black"
          :_hover="{ color: 'vue.400' }"
          is-external
          :href="person.website"
        >
          <c-icon name="globe" />
        </c-link>
      </c-box>
    </c-box>
  </c-box>
</template>

<script>
import { CBox, CHeading, CText, CLink, CIcon } from '@chakra-ui/vue'

export default {
  name: 'Contributors',
  components: {
    CBox,
    CHeading,
    CText,
    CLink,
    CIcon
  },
  data () {
    return {
      contributors: [{
        name: 'Jonathan Bakebwa',
        github: 'https://github.com/codebender828',
        twitter: 'https://twitter.com/codebender828',
        website: 'https://jbakebwa.dev',
        contributions: 'Creator & Maintainer',
        nationality: '🇺🇬'
      },
      {
        name: 'Kelvin Omereshone',
        github: 'https://github.com/DominusKelvin',
        twitter: 'https://twitter.com/dominus_kelvin',
        website: 'https://dominus.dev',
        contributions: 'Documentation',
        nationality: '🇳🇬'
      },
      {
        name: 'Mesut Koca',
        github: 'https://github.com/koca',
        twitter: 'https://twitter.com/imesutkoca',
        website: 'https://mesut.dev',
        contributions: 'Testing & Code',
        nationality: '🇹🇷'
      }]
    }
  }
}
</script>
