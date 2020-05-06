<template>
  <c-box>
    <c-heading>
      Contributors
    </c-heading>
    <pre>
      {{ contributors }}
    </pre>
  </c-box>
</template>

<script>
import { CBox, CHeading } from '@chakra-ui/vue'

export default {
  name: 'Contributors',
  components: {
    CBox,
    CHeading
  },
  data () {
    return {
      contributors: [{
        name: 'Jonathan Bakebwa',
        github: 'https://github.com/codebender828',
        twitter: 'https://twitter.com/codebender828',
        website: 'https://jbakebwa.dev',
        bio: '', // Keep this brief!
        contributions: 'Author & Maintainer',
        nationality: '🇺🇬'
      },
      {
        name: 'Kelvin Omereshone',
        github: 'https://github.com/DominusKelvin',
        twitter: 'https://twitter.com/DominusKelvin',
        website: 'https://example.com',
        bio: '', // Keep this brief!
        contributions: '',
        nationality: '🇳🇬'
      },
      {
        name: 'Mesut Koca',
        github: 'https://github.com/mesut',
        twitter: 'https://twitter.com/koca',
        website: 'https://example.com',
        bio: '', // Keep this brief!
        contributions: '',
        nationality: '🇹🇷'
      }]
    }
  }
}
</script>
