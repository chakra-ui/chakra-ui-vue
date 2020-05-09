const SEO = {
  name: 'SEO',
  props: {
    title: {
      type: String,
      default: 'Chakra UI Vue'
    },
    description: {
      type: String,
      default: 'Build Accessible Vue Apps with Speed ⚡️'
    }
  },
  metaInfo () {
    return {
      title: `Chakra UI Vue | ${this.title || ''}`,
      meta: [
        {
          hid: 'description',
          'data-n-head': '1',
          name: 'description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'author',
          content: 'Jonathan Bakebwa'
        },
        {
          name: 'image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'image',
          property: 'og:image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        {
          name: 'description',
          property: 'og:description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        // OpenGraph tags
        {
          name: 'og:url',
          content: this.$route.fullPath
        },
        {
          name: 'og:type',
          content: 'article'
        },
        {
          name: 'og:description',
          content: 'Build Accessible Vue Apps with Speed ⚡️'
        },
        {
          name: 'og:image',
          content: 'https://res.cloudinary.com/xtellar/image/upload/q_66/v1584203770/chakra-ui/chakra-ui-vue-banner.jpg'
        },
        {
          name: 'twitter:title',
          content: 'Chakra UI Vue | Documentation'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:creator',
          content: '@chakraui_vue'
        }
      ]
    }
  },
  render: h => h(null)
}

export default SEO
