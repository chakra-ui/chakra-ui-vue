<template>
  <c-box as="main" font-family="body">
    <SEO
      title="Chakra UI Vue | Simple, Modular and Accessible UI Components for your Vue Applications."
      description="Simple, Modular and Accessible UI Components for your Vue Applications."
    />
    <hero
      id="main-content"
      v-chakra="{
        ':focus': {
          outline: 'none',
          shadow: 'outline'
        }
      }"
    />
    <c-flex
      as="section"
      py="10"
      :flex-dir="['column', 'column', 'row']"
      font-family="body"
    >
      <c-grid :template-columns="['auto', 'auto', 'repeat(3, 1fr)']" gap="6">
        <c-box m="3">
          <c-flex align-items="center" mb="5">
            <c-flex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <c-icon size="25px" name="universal-access" />
            </c-flex>
            <c-heading as="h4" size="md">
              Accessible
            </c-heading>
          </c-flex>
          Chakra UI strictly follows WAI-ARIA standards. All components come
          with proper attributes and keyboard interactions out of the box.
        </c-box>
        <c-box m="3">
          <c-flex align-items="center" mb="5">
            <c-flex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <c-icon size="25px" name="palette" />
            </c-flex>
            <c-heading as="h4" size="md">
              Themeable
            </c-heading>
          </c-flex>
          Quickly and easily reference values from your theme throughout your
          entire application, on any component.
        </c-box>
        <c-box m="3">
          <c-flex align-items="center" mb="5">
            <c-flex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <c-icon size="25px" name="cubes" />
            </c-flex>
            <c-heading as="h4" size="md">
              Composable
            </c-heading>
          </c-flex>
          Components were built with composition in mind. You can leverage any
          component to create new things.
        </c-box>
      </c-grid>
    </c-flex>
    <example />
    <Footer />
  </c-box>
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
