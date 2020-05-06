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
          content: this.description
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  render: h => h(null)
}

export default SEO
