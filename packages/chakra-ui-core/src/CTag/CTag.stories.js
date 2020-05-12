import { storiesOf } from '@storybook/vue'
import { CBox, CTag, CTagLabel, CFlex, CTagIcon, CTagCloseButton, CAvatar } from '..'

storiesOf('UI | Tag', module)
  .add('Basic Usage', () => ({
    components: { CBox, CFlex, CTag, CTagLabel, CTagIcon, CTagCloseButton },
    template: `
      <CFlex mb="3">
        <CTag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size" mx="1" variantColor="green">
          <CTagIcon icon="add" size="12px" />
          <CTagLabel>Green</CTagLabel>
        </CTag>
      </CFlex>
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
          <CTagCloseButton icon="sun" size="12px" />
        </CTag>
      </CBox>
    `
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
