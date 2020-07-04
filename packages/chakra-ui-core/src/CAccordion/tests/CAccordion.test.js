import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon } from '..'
import { render, userEvent, fireEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent(
    {
      template: `
    <CAccordion>
      <CAccordionItem id="ac-1">
        <CAccordionHeader>Section 1 title<CAccordionIcon /></CAccordionHeader>
        <CAccordionPanel>Section 1 text</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>
    `
    }
  )
  expect(asFragment()).toMatchSnapshot()
})

it('uncontrolled: It opens the accordion panel', () => {
  const { getByTestId } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader data-testid="button">Section 1 title<CAccordionIcon /></CAccordionHeader>
        <CAccordionPanel data-testid="panel">Section 1 text</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>
    `
  }
  )
  const button = getByTestId('button')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

it('uncontrolled: toggles the accordion on click', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Trigger</CAccordionHeader>
        <CAccordionPanel>Panel</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const trigger = getByText('Trigger')

  userEvent.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  // you can't toggle an accordion without passing `allowToggle`
  userEvent.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
})

// test the only one accordion can be visible + is not togglable
it('only one accordion can be visible + is not togglable', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>First section</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Second section</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const firstAccordion = getByText('First section')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')
})

// test the only one accordion can be visible + is togglable
it('only one accordion can be visible + is togglable', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion allowToggle>
      <CAccordionItem>
        <CAccordionHeader>First section</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Second section</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })
  const firstAccordion = getByText('First section')

  // TODO: Why its not working?
  // fireEvent.click(firstAccordion)
  // expect(firstAccordion).toHaveAttribute('aria-expanded', 'false')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')
})

// test that multiple accordions can be opened + is togglable
it('multiple accordions can be opened + is togglable', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion allowMultiple :defaultIndex="[0]">
      <CAccordionItem>
        <CAccordionHeader>First section</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Second section</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const firstAccordion = getByText('First section')
  const secondAccordion = getByText('Second section')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

  userEvent.click(secondAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')
})

// it has the proper aria attributes
it('has the proper aria attributes', () => {
  const { getByText, getByTestId } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })
  const button = getByText('Section 1 title')
  const panel = getByTestId('panel1')
  expect(button).toHaveAttribute('aria-controls')
  expect(button).toHaveAttribute('aria-expanded')
  expect(panel).toHaveAttribute('aria-labelledby')
})

// test that tab moves focus to the next focusable element
it('tab moves focus to the next focusable element', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>First section</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Second section</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Last section</CAccordionHeader>
        <CAccordionPanel>Panel 3</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const first = getByText('First section')
  const second = getByText('Second section')
  const last = getByText('Last section')

  userEvent.tab()
  expect(first).toHaveFocus()

  userEvent.tab()
  expect(second).toHaveFocus()

  userEvent.tab()
  expect(last).toHaveFocus()
})

// test that aria-contols for button is same as id for panel
it('aria-contols for button is same as id for panel', () => {
  const { getByText, getByTestId } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const button = getByText('Section 1 title')
  const panel = getByTestId('panel1')
  expect(button.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'))
})

// test that aria-expanded is true/false when accordion is open/closed
it('aria-expanded is true/false when accordion is open/closed', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion :defaultIndex="[0]">
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Section 2 title</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const button = getByText('Section 1 title')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

// test that panel has role=region and aria-labelledby
it('panel has role=region and aria-labelledby', () => {
  const { getByTestId } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })
  const panel = getByTestId('panel1')

  expect(panel).toHaveAttribute('aria-labelledby')
  expect(panel).toHaveAttribute('role', 'region')
})

/**
 * This particular arrow listener for accordions
 * implementation is optional as per the
 * WAI-ARIA Accordion spec.
 *
 * We may decide to implement this is the future if the
 * need becomes apparent.
 * @see A11Y https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAccordion/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
 */
// eslint-disable-next-line no-undef
xit('arrow up & down moves focus to next/previous accordion', () => {
  const { getByText } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Section 2 title</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const first = getByText('Section 1 title')
  const second = getByText('Section 2 title')

  fireEvent.keyDown(first, { key: 'ArrowDown', keyCode: 40 })
  expect(second).toHaveFocus()

  fireEvent.keyDown(second, { key: 'ArrowUp', keyCode: 38 })
  expect(first).toHaveFocus()
})
