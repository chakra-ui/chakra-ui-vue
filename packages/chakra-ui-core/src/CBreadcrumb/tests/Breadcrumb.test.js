import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator
    },
    template: `
    <div>
      <Breadcrumb :add-separator="false">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Breadcrumb 1</BreadcrumbLink>
          <BreadcrumbSeparator color="tomato" font-size="10px" font-weight="bold" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
          <BreadcrumbSeparator color="firebrick" font-size="20px" font-weight="bold" />
        </BreadcrumbItem>
      </Breadcrumb>
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
    <Breadcrumb separator="-">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/about">About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>`
  })
  expect(asFragment()).toMatchSnapshot()
})

it('should have the proper aria-attributes', () => {
  const { getByText, getAllByRole, getByLabelText } = renderComponent({
    template: `
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/about">About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>`
  })

  // surrounding `nav` has aria-label="breadcrumb"
  getByLabelText('breadcrumb', { selector: 'nav' })

  // `isCurrentPage` link has aria-current="page"
  const currentPageLink = getByText('Contact')
  expect(currentPageLink).toHaveAttribute('aria-current', 'page')

  // separator receives presentation="role"
  expect(getAllByRole('presentation')).toHaveLength(2)
})
