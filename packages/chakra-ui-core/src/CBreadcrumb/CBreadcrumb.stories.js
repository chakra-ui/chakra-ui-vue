import { storiesOf } from '@storybook/vue'
import { CReset, CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink, CBreadcrumbSeparator } from '..'

storiesOf('UI | Breadcrumb', module)
  .add('With custom separator', () => ({
    components: { CReset, CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink, CBreadcrumbSeparator },
    template: `
      <div>
        <CReset />
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
    `
  }))
