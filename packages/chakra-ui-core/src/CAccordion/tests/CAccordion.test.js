import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon } from '..'
import { render, userEvent, fireEvent, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CAccordion, CAccordionItem, CAccordionHeader, CAccordionPanel, CAccordionIcon },
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem id="ac-1">
        <CAccordionHeader>Section 1 title<CAccordionIcon /></CAccordionHeader>
        <CAccordionPanel>Section 1 text</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>
    `
  })
  expect(asFragment()).toMatchSnapshot()
})

it('uncontrolled: It opens the accordion panel', () => {
  renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader data-testid="button">Section 1 title<CAccordionIcon /></CAccordionHeader>
        <CAccordionPanel data-testid="panel">Section 1 text</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>
    `
  })
  const button = screen.getByTestId('button')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

it('uncontrolled: toggles the accordion on click', async () => {
  renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Trigger</CAccordionHeader>
        <CAccordionPanel>Panel</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  await userEvent.click(screen.getByText('Trigger'))
  expect(screen.getByText('Trigger')).toHaveAttribute('aria-expanded', 'true')

  // you can't toggle an accordion without passing `allowToggle`
  await userEvent.click(screen.getByText('Trigger'))
  expect(screen.getByText('Trigger')).toHaveAttribute('aria-expanded', 'true')
})

// test the only one accordion can be visible + is not togglable
it('only one accordion can be visible + is not togglable', async () => {
  renderComponent({
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

  await userEvent.click(screen.getByText('First section'))
  expect(screen.getByText('First section')).toHaveAttribute('aria-expanded', 'true')

  await userEvent.click(screen.getByText('First section'))
  expect(screen.getByText('First section')).toHaveAttribute('aria-expanded', 'true')
})

// test the only one accordion can be visible + is togglable
it('only one accordion can be visible + is togglable', async () => {
  renderComponent({
    template: `
    <CAccordion allowToggle>
      <CAccordionItem data-testid="accordionItem1">
        <CAccordionHeader>First section</CAccordionHeader>
        <CAccordionPanel>Panel 1</CAccordionPanel>
      </CAccordionItem>
      <CAccordionItem>
        <CAccordionHeader>Second section</CAccordionHeader>
        <CAccordionPanel>Panel 2</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  await userEvent.click(screen.getByText('First section'))
  expect(screen.getByText('First section')).not.toHaveAttribute('aria-expanded') // false or null?

  await userEvent.click(screen.getByText('First section'))
  expect(screen.getByText('First section')).toHaveAttribute('aria-expanded', 'true')
})

// test that multiple accordions can be opened + is togglable
it('multiple accordions can be opened + is togglable', async () => {
  renderComponent({
    template: `
    <CAccordion allowMultiple :defaultIndex="[0, 1]">
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

  expect(screen.getByText('First section')).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Second section')).toHaveAttribute('aria-expanded', 'true')

  await userEvent.click(screen.getByText('First section'))
  expect(screen.getByText('First section')).not.toHaveAttribute('aria-expanded')
})

// it has the proper aria attributes
it('has the proper aria attributes', () => {
  renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })
  const button = screen.getByText('Section 1 title')
  const panel = screen.getByTestId('panel1')
  expect(button).toHaveAttribute('aria-controls')
  expect(button).toHaveAttribute('aria-expanded')
  expect(panel).toHaveAttribute('aria-labelledby')
})

// test that tab moves focus to the next focusable element
it('tab moves focus to the next focusable element', async () => {
  renderComponent({
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

  const first = screen.getByText('First section')
  const second = screen.getByText('Second section')
  const last = screen.getByText('Last section')

  await userEvent.tab()
  expect(first).toHaveFocus()

  await userEvent.tab()
  expect(second).toHaveFocus()

  await userEvent.tab()
  expect(last).toHaveFocus()
})

// test that aria-contols for button is same as id for panel
it('aria-contols for button is same as id for panel', () => {
  renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })

  const button = screen.getByText('Section 1 title')
  const panel = screen.getByTestId('panel1')
  expect(button.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'))
})

// test that aria-expanded is true/false when accordion is open/closed
it('aria-expanded is true/false when accordion is open/closed', () => {
  renderComponent({
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

  const button = screen.getByText('Section 1 title')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

// test that panel has role=region and aria-labelledby
it('panel has role=region and aria-labelledby', () => {
  renderComponent({
    template: `
    <CAccordion>
      <CAccordionItem>
        <CAccordionHeader>Section 1 title</CAccordionHeader>
        <CAccordionPanel data-testid="panel1">Panel 1</CAccordionPanel>
      </CAccordionItem>
    </CAccordion>`
  })
  const panel = screen.getByTestId('panel1')

  expect(panel).toHaveAttribute('aria-labelledby')
  expect(panel).toHaveAttribute('role', 'region')
})

// eslint-disable-next-line no-undef
xit('arrow up & down moves focus to next/previous accordion', async () => {
  renderComponent({
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

  const first = screen.getByText('Section 1 title')
  const second = screen.getByText('Section 2 title')

  await fireEvent.keyDown(first, { key: 'ArrowDown', keyCode: 40 })
  expect(second).toHaveFocus()

  await fireEvent.keyDown(second, { key: 'ArrowUp', keyCode: 38 })
  expect(first).toHaveFocus()
})
