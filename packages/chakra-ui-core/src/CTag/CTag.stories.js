import { storiesOf } from '@storybook/vue'
import { CBox, CTag, CStack, CTagLabel, CTagIcon, CTagCloseButton, CAvatar } from '..'

storiesOf('UI | Tag', module)
  .add('Basic Usage', () => ({
    components: { CBox, CStack, CTag, CTagLabel, CTagIcon, CTagCloseButton },
    template: `
      <CStack is-inline>
        <CBox v-for="size in ['sm', 'md', 'lg']" >
          <CTag :size="size" :key="size" mx="1" variantColor="green">
            <CTagIcon icon="add" size="12px" />
            <CTagLabel>Green</CTagLabel>
          </CTag>
        </CBox>
      </CStack>
    `
  }))
  .add('With Right Icon', () => ({
    components: { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton },
    template: `
      <CBox mb="3">
        <CTag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'indigo'" mx="1" variantColor="indigo">
          <CTagLabel>Green</CTagLabel>
          <CTagIcon icon="sun" size="12px" />
        </CTag>
      </CBox>
    `
  }))
  .add('With close button', () => ({
    components: { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton },
    template: `
      <CBox mb="3">
        <CTag rounded="full" v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'cyan'" mx="1" variantColor="cyan">
          <CTagLabel>Green</CTagLabel>
          <CTagCloseButton @click="onClick" icon="sun" size="12px" />
        </CTag>
      </CBox>
    `,
    methods: {
      onClick (e) {
        console.log('clicked TagIconButton', e)
      }
    }
  }))
  .add('With custom element', () => ({
    components: { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton, CAvatar },
    template: `
      <CBox mb="3">
        <CTag rounded="full" mx="1" variantColor="red">
          <CAvatar
            name="Jonathan Bakebwa"
            size="xs"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
            :ml="-2"
            :mr="2"
          />
          <CTagLabel>Jonathan</CTagLabel>
        </CTag>
      </CBox>
    `
  }))
