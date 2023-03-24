import { storiesOf } from '@storybook/vue'
import CInput from '../CInput'
import CText from '../CText'
import CList, { CListItem, CListIcon } from '../CList'
import { CSkipNavLink, CSkipNavContent } from './CSkipNav'

storiesOf('UI | SkipNav', module).add('Default', () => ({
  components: {
    CSkipNavLink,
    CSkipNavContent,
    CInput,
    CText,
    CList,
    CListItem,
    CListIcon
  },
  template: `
  <div>
    <CSkipNavLink>Skip to Content</CSkipNavLink>
    <CSkipNavContent>
      <main>
        <CText>
        To test the SkipNav Components:
          <CList mb="4">
            <CListItem>
              <CListIcon icon="chevron-right" />
              Place focus on the input
            </CListItem>
            <CListItem>
              <CListIcon icon="chevron-right" />
              Press "Shift + Tab" to make the SkipNavLink appear
            </CListItem>
            <CListItem>
              <CListIcon icon="chevron-right" />
              Hit "Enter". You might leave the page to load up the iFrame isolated
            </CListItem>
            <CListItem>
              <CListIcon icon="chevron-right" />
              You should now see a blue outline over all the content.
            </CListItem>
          </CList>
        </CText>
        <label>Example Form Search</label>
        <CInput placeholder="Search" />
      </main>
    </CSkipNavContent>
  </div>
  `
}))
