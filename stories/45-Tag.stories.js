import { storiesOf } from '@storybook/vue'
import { Box, Tag, TagLabel, TagIcon, TagCloseButton, Avatar } from '../packages/kiwi-core/src'

storiesOf('UI | Tag', module)
  .add('Basic Usage', () => ({
    components: { Box, Tag, TagLabel, TagIcon, TagCloseButton, Avatar },
    template: `
      <Box mb="3">
        <Tag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size" mx="1" variantColor="green">
          <TagIcon icon="add" size="12px" />
          <TagLabel>Green</TagLabel>
        </Tag>
      </Box>
    `
  }))
  .add('With Right Icon', () => ({
    components: { Box, Tag, TagLabel, TagIcon, TagCloseButton, Avatar },
    template: `
      <Box mb="3">
        <Tag v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'indigo'" mx="1" variantColor="indigo">
          <TagLabel>Green</TagLabel>
          <TagIcon icon="sun" size="12px" />
        </Tag>
      </Box>
    `
  }))
  .add('With close button', () => ({
    components: { Box, Tag, TagLabel, TagIcon, TagCloseButton, Avatar },
    template: `
      <Box mb="3">
        <Tag rounded="full" v-for="size in ['sm', 'md', 'lg']" :size="size" :key="size + 'cyan'" mx="1" variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton icon="sun" size="12px" />
        </Tag>
      </Box>
    `
  }))
  .add('With custom element', () => ({
    components: { Box, Tag, TagLabel, TagIcon, TagCloseButton, Avatar },
    template: `
      <Box mb="3">
        <Tag rounded="full" mx="1" variantColor="red">
          <Avatar
            name="Jonathan Bakebwa"
            size="xs"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
            :ml="-2"
            :mr="2"
          />
          <TagLabel>Jonathan</TagLabel>
        </Tag>
      </Box>
    `
  }))
