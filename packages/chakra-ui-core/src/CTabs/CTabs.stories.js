import { storiesOf } from '@storybook/vue'
import { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel } from '..'

storiesOf('UI | Tabs', module)
  .add('Basic Usage', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px">
        <CTabs>
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
  .add('With default tab index', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px" :defaultIndex="1">
        <CTabs isFitted>
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
  .add('With variants', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px">
        <CTabs variant="line" m="4">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>

        <CTabs variant="enclosed" m="4">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>

        <CTabs variant="enclosed-colored" m="4">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>

        <CTabs variant="solid-rounded" m="4">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>

        <CTabs variant="unstyled" m="4">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
  .add('With variant color', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px">
        <CTabs variant="soft-rounded" variantColor="indigo">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
  .add('With alignment', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px">
        <CTabs align="end">
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
  .add('With fitted', () => ({
    components: { CBox, CTabs, CTabList, CTab, CTabPanels, CTabPanel },
    template: `
      <CBox w="600px">
        <CTabs isFitted>
          <CTabList>
            <CTab>One</CTab>
            <CTab>Two</CTab>
            <CTab>Three</CTab>
          </CTabList>

          <CTabPanels>
            <CTabPanel>
              <p>one!</p>
            </CTabPanel>
            <CTabPanel>
              <p>two!</p>
            </CTabPanel>
            <CTabPanel>
              <p>three!</p>
            </CTabPanel>
          </CTabPanels>
        </CTabs>
      </CBox>
    `
  }))
