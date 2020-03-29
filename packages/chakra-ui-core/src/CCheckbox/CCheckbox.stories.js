import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CBox, CCheckbox, CStack } from '..'

storiesOf('UI | Checkbox', module)
  .add('Basic Usage', () => ({
    components: { CBox, CCheckbox },
    template: `
      <CBox mb="3">
        <CCheckbox @change="action" v-model="isChecked">
          Checkbox
        </CCheckbox>
      </CBox>
    `,
    data () {
      return {
        isChecked: true
      }
    },
    methods: {
      action: action()
    }
  }))
  .add('Disabled', () => ({
    components: { CStack, CCheckbox },
    template: `
      <CStack spacing="10" isInline>
        <CCheckbox isDisabled>Checkbox</CCheckbox>
        <CCheckbox isDisabled defaultIsChecked>
          Checkbox
        </CCheckbox>
      </CStack>
    `
  }))
  .add('With custom colors', () => ({
    components: { CStack, CCheckbox },
    template: `
      <CStack spacing="10" isInline>
        <CCheckbox variantColor="red" defaultIsChecked>
          Checkbox
        </CCheckbox>
        <CCheckbox variantColor="green" defaultIsChecked>
          Checkbox
        </CCheckbox>
      </CStack>
    `
  }))
  .add('With sizes', () => ({
    components: { CStack, CCheckbox },
    template: `
      <CStack spacing="10" isInline>
        <CCheckbox size="sm" variantColor="red" defaultIsChecked>
          Checkbox
        </CCheckbox>
        <CCheckbox siz="md" variantColor="green" defaultIsChecked>
          Checkbox
        </CCheckbox>
        <CCheckbox size="lg" variantColor="pink" defaultIsChecked>
          Checkbox
        </CCheckbox>
      </CStack>
    `
  }))
  .add('Invalid checkbox', () => ({
    components: { CBox, CCheckbox },
    template: `
    <CBox mb="3">
    <CCheckbox isInvalid>Checkbox</CCheckbox>
    </CBox>
    `
  }))
  .add('Is indeterminate example', () => ({
    components: { CStack, CBox, CCheckbox },
    template: `
      <CBox>
        <CCheckbox
        :isChecked="allChecked"
        :isIndeterminate="isIndeterminate"
        @change="(val, $e) => { checkedItems = [$e.target.checked, $e.target.checked] }"
      >
        Parent Checkbox
      </CCheckbox>
      <CStack pl="6" mt="1" spacing="1">
        <CCheckbox
          :isChecked="checkedItems[0]"
          @change="(val, $e) => { checkedItems = [$e.target.checked, checkedItems[1]] }"
        >
          Child Checkbox 1
        </CCheckbox>
        <CCheckbox
          :isChecked="checkedItems[1]"
          @change="(val, $e) => { checkedItems = [checkedItems[0], $e.target.checked] }"
        >
          Child Checkbox 2
        </CCheckbox>
      </CStack>
      </CBox>
    `,
    data () {
      return {
        checkedItems: [false, false]
      }
    },
    computed: {
      allChecked () {
        return this.checkedItems.every(Boolean)
      },
      isIndeterminate () {
        return this.checkedItems.some(Boolean) && !this.allChecked
      }
    }
  }))
