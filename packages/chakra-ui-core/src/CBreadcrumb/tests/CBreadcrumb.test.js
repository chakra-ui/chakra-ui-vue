import { CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink, CBreadcrumbSeparator } from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink, CBreadcrumbSeparator
    },
    template: `
    <div>
      <CBreadcrumb :add-separator="false">
        <CBreadcrumbItem>
          <CBreadcrumbLink href="#">Breadcrumb 1</CBreadcrumbLink>
          <CBreadcrumbSeparator color="tomato" font-size="10px" font-weight="bold" />
        </CBreadcrumbItem>
        <CBreadcrumbItem>
          <CBreadcrumbLink href="#">Breadcrumb 2</CBreadcrumbLink>
          <CBreadcrumbSeparator color="firebrick" font-size="20px" font-weight="bold" />
        </CBreadcrumbItem>
      </CBreadcrumb>
    </div>
   `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display custom seperator ', () => {
  const { asFragment } = renderComponent({
    template: `
    <CBreadcrumb separator="-">
      <CBreadcrumbItem>
        <CBreadcrumbLink href="/">Home</CBreadcrumbLink>
      </CBreadcrumbItem>
      <CBreadcrumbItem>
        <CBreadcrumbLink href="/about">About</CBreadcrumbLink>
      </CBreadcrumbItem>
      <CBreadcrumbItem isCurrentPage>
        <CBreadcrumbLink href="/contact">Contact</CBreadcrumbLink>
      </CBreadcrumbItem>
    </CBreadcrumb>`
  })
  expect(asFragment()).toMatchSnapshot()
})

it('should have the proper aria-attributes', () => {
  const { getByText, getAllByRole, getByLabelText } = renderComponent({
    template: `
    <CBreadcrumb>
      <CBreadcrumbItem>
        <CBreadcrumbLink href="/">Home</CBreadcrumbLink>
      </CBreadcrumbItem>
      <CBreadcrumbItem>
        <CBreadcrumbLink href="/about">About</CBreadcrumbLink>
      </CBreadcrumbItem>
      <CBreadcrumbItem isCurrentPage>
        <CBreadcrumbLink href="/contact">Contact</CBreadcrumbLink>
      </CBreadcrumbItem>
    </CBreadcrumb>`
  })

  // surrounding `nav` has aria-label="breadcrumb"
  getByLabelText('breadcrumb', { selector: 'nav' })

  // `isCurrentPage` link has aria-current="page"
  const currentPageLink = getByText('Contact')
  expect(currentPageLink).toHaveAttribute('aria-current', 'page')

  // separator receives presentation="role"
  expect(getAllByRole('presentation')).toHaveLength(2)
})
