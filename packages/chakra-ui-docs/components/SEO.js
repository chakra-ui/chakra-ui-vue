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
        }
      ]
    }
  },
  render: h => h(null)
}

export default SEO
