<template>
  <Canvas>
    <Accordion allowToggle allowMultiple>
      <AccordionItem>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            Section 1 title
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem v-slot="{ isExpanded }">
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            Section 2 title | isExpanded: {{ isExpanded }}
          </Box>
          <AccordionIcon size="12px" :name="isExpanded ? 'minus' : 'add'" />
        </AccordionHeader>
        <AccordionPanel pb="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Canvas,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      count: 0,
      colorMode: 'light',
      value: 60,
      showCollapsed: true
    }
  },
  methods: {
    logClick () {
      console.log('downloading')
    },
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    showPopper2 () {
      this.show2 = !this.show2
    },
    hidePopper2 () {
      this.show2 = false
    },
    focus (el) {
      setTimeout(() => {
        if (el) {
          if (el instanceof HTMLElement) el.focus()
          else if (el.$el && el.$el.focus) el.$el.focus()
        }
      })
    }
  }
}
</script>
