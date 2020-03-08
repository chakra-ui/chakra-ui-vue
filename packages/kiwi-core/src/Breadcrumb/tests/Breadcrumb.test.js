import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../'
import { render } from '@/tests/test-utils'
import CompositionApi from '@vue/composition-api'

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
  return render(base, {}, vue => {
    vue.use(CompositionApi)
  })
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
