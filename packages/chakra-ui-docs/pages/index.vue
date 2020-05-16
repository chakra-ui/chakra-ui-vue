<template>
  <CBox as="main" font-family="body">
    <SEO
      title="Chakra UI Vue | Simple, Modular and Accessible UI Components for your Vue Applications."
      description="Simple, Modular and Accessible UI Components for your Vue Applications."
    />
    <Hero />
    <CFlex
      as="section"
      py="10"
      :flex-dir="['column', 'column', 'row']"
      font-family="body"
    >
      <CGrid :template-columns="['auto', 'auto', 'repeat(3, 1fr)']" gap="6">
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <CIcon size="25px" name="universal-access" />
            </CFlex>
            <CHeading as="h4" size="md">
              Accessible
            </CHeading>
          </CFlex>
          Chakra UI strictly follows WAI-ARIA standards. All components come
          with proper attributes and keyboard interactions out of the box.
        </CBox>
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <CIcon size="25px" name="palette" />
            </CFlex>
            <CHeading as="h4" size="md">
              Themeable
            </CHeading>
          </CFlex>
          Quickly and easily reference values from your theme throughout your
          entire application, on any component.
        </CBox>
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <CIcon size="25px" name="cubes" />
            </CFlex>
            <CHeading as="h4" size="md">
              Composable
            </CHeading>
          </CFlex>
          Components were built with composition in mind. You can leverage any
          component to create new things.
        </CBox>
      </CGrid>
    </CFlex>
    <Example />
    <Footer />
  </CBox>
</template>

<script>
import { CBox, CFlex, CIcon, CHeading, CGrid } from '@chakra-ui/vue'
import Hero from '~/components/Hero.vue'
import Footer from '~/components/Footer.vue'
import SEO from '~/components/SEO'
import Example from '~/components/Example.vue'

export default {
  layout: 'home',
  components: {
    Hero,
    Footer,
    Example,
    CBox,
    CFlex,
    CIcon,
    CHeading,
    CGrid,
    SEO
  },
  metaInfo () {
    return {
      title: 'Chakra UI Vue | Simple, Modular and Accessible UI Components for your Vue Applications.',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Simple, Modular and Accessible UI Components for your Vue Applications.'
      },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },
  beforeMount () {
    console.log(this.$mixpanel)
    this.$mixpanel.track('Page view', { page: '/' })
  }
}
</script>
