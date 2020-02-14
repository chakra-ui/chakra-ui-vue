import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { CSSReset, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../packages/kiwi-core/src'

storiesOf('UI | Breadcrumb', module)
  .addDecorator(centered)
  .add('With custom separator', () => ({
    components: { CSSReset, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator },
    template: `
      <div>
        <CSSReset />
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
    `
  }))
