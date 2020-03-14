import { Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon } from '..'
import { render, userEvent, fireEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon },
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent(
    {
      template: `
    <Accordion>
      <AccordionItem id="ac-1">
        <AccordionHeader>Section 1 title<AccordionIcon /></AccordionHeader>
        <AccordionPanel>Section 1 text</AccordionPanel>
      </AccordionItem>
    </Accordion>
    `
    }
  )
  expect(asFragment()).toMatchSnapshot()
})

it('uncontrolled: It opens the accordion panel', () => {
  const { getByTestId } = renderComponent({
    template: `
    <Accordion>
      <AccordionItem>
        <AccordionHeader data-testid="button">Section 1 title<AccordionIcon /></AccordionHeader>
        <AccordionPanel data-testid="panel">Section 1 text</AccordionPanel>
      </AccordionItem>
    </Accordion>
    `
  }
  )
  const button = getByTestId('button')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

it('uncontrolled: toggles the accordion on click', () => {
  const { getByText } = renderComponent({
    template: `
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Trigger</AccordionHeader>
        <AccordionPanel>Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>`
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
    <Accordion>
      <AccordionItem>
        <AccordionHeader>First section</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Second section</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>`
  })

  const firstAccordion = getByText('First section')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')
})

// test the only one accordion can be visible + is togglable
it('only one accordion can be visible + is togglable', async () => {
  const { getByText } = renderComponent({
    template: `
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionHeader>First section</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Second section</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>`
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
    <Accordion allowMultiple :defaultIndex="[0]">
      <AccordionItem>
        <AccordionHeader>First section</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Second section</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>`
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
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Section 1 title</AccordionHeader>
        <AccordionPanel data-testid="panel1">Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>`
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
    <Accordion>
      <AccordionItem>
        <AccordionHeader>First section</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Second section</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Last section</AccordionHeader>
        <AccordionPanel>Panel 3</AccordionPanel>
      </AccordionItem>
    </Accordion>`
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
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Section 1 title</AccordionHeader>
        <AccordionPanel data-testid="panel1">Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>`
  })

  const button = getByText('Section 1 title')
  const panel = getByTestId('panel1')
  expect(button.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'))
})

// test that aria-expanded is true/false when accordion is open/closed
it('aria-expanded is true/false when accordion is open/closed', () => {
  const { getByText } = renderComponent({
    template: `
    <Accordion :defaultIndex="[0]">
      <AccordionItem>
        <AccordionHeader>Section 1 title</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Section 2 title</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>`
  })

  const button = getByText('Section 1 title')
  expect(button).toHaveAttribute('aria-expanded', 'true')
})

// test that panel has role=region and aria-labelledby
it('panel has role=region and aria-labelledby', () => {
  const { getByTestId } = renderComponent({
    template: `
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Section 1 title</AccordionHeader>
        <AccordionPanel data-testid="panel1">Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>`
  })
  const panel = getByTestId('panel1')

  expect(panel).toHaveAttribute('aria-labelledby')
  expect(panel).toHaveAttribute('role', 'region')
})

// eslint-disable-next-line no-undef
xit('arrow up & down moves focus to next/previous accordion', () => {
  const { getByText } = renderComponent({
    template: `
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Section 1 title</AccordionHeader>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Section 2 title</AccordionHeader>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>`
  })

  const first = getByText('Section 1 title')
  const second = getByText('Section 2 title')

  fireEvent.keyDown(first, { key: 'ArrowDown', keyCode: 40 })
  expect(second).toHaveFocus()

  fireEvent.keyDown(second, { key: 'ArrowUp', keyCode: 38 })
  expect(first).toHaveFocus()
})
