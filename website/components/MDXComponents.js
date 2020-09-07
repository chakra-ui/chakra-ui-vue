import { css } from 'emotion'
import { CHeading, CBox, Css, CPseudoBox, CCode, CText } from '@chakra-ui/vue'
import CodeBlock from './CodeBlock'
import { stringToUrl } from '~/utils'
import pages from '~/utils/all-routes'

const routes = pages
  .map((page) => {
    return page === 'Index' ? stringToUrl('') : stringToUrl(page)
  })

const Heading = {
  name: 'Heading',
  inheritAttrs: false,
  inject: ['$chakraTheme'],
  computed: {
    theme () {
      return this.$chakraTheme()
    }
  },
  render (h) {
    const text = this.$slots.default[0].text

    return h(CHeading, {
      attrs: {
        ...this.$attrs,
        mb: '1rem',
        mt: '2rem'
      }
    }, [
      h(CBox, {
        class: [css(Css({
          '&[id]': {
            pointerEvents: 'auto'
          },
          '&[id]:hover a': { opacity: 1 }
        })(this.theme))],
        attrs: {
          display: 'inline-block'
        },
        domProps: {
          ...text && { id: stringToUrl(text, '') }
        }
      }, [
        this.$slots.default,
        h(CPseudoBox, {
          props: {
            as: 'a'
          },
          attrs: {
            color: 'vue.500',
            fontWeight: 'normal',
            outline: 'none',
            _focus: { opacity: 1, boxShadow: 'outline' },
            opacity: '0',
            ml: '0.375rem',
            ...this.$attrs,
            'aria-label': 'anchor',
            ...text && { href: stringToUrl(text, '#') }
          }
        }, '#')
      ])
    ])
  }
}

const MDXComponents = {
  h1: props => ({
    name: 'H1',
    render () {
      return (
        <CHeading as="h1" size="2xl" my="1em" { ...props}>
          {this.$slots.default}
        </CHeading>
      )
    }
  }),
  h2: props => ({
    name: 'H2',
    render () {
      return (
        <Heading
          as="h2"
          fontWeight="semibold"
          fontSize="1.5rem"
          {...props}
        >
          {this.$slots.default}
        </Heading>
      )
    }
  }),
  h3: props => ({
    name: 'H2',
    render () {
      return (
        <Heading
          as="h3"
          fontWeight="semibold"
          fontSize="lg"
          {...props}
        >
          {this.$slots.default}
        </Heading>
      )
    }
  }),
  inlineCode: props => ({
    name: 'InlineCode',
    render () {
      return (
        <CCode variant-color="orange" font-weight="bold" px="1" rounded="md" fontSize="0.84em" {...props}>
          {this.$slots.default}
        </CCode>
      )
    }
  }),
  // eslint-disable-next-line
  'code': CodeBlock,
  pre: props => ({
    name: 'Box',
    render () {
      return (
        <CBox my="3" {...props}>
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  kdb: props => ({
    name: 'KDB',
    inject: ['$chakraColorMode'],
    computed: {
      colorMode () {
        return this.$chakraColorMode()
      },
      bg () {
        const bg = { light: 'gray.100', dark: 'whiteAlpha.50' }
        return bg[this.colorMode]
      }
    },
    render () {
      return (
        <CBox
          as="kbd"
          bg={this.bg}
          rounded="md"
          border="1px"
          borderColor="inherit"
          borderBottomWidth="3px"
          fontSize="0.8em"
          fontWeight="bold"
          lineHeight="normal"
          px="0.4em"
          whiteSpace="nowrap"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  br: props => ({
    name: 'BR',
    render () {
      return (
        <CBox height="24px" {...props} />
      )
    }
  }),
  hr: props => ({
    name: 'HR',
    render () {
      return (
        <CBox as="hr" borderTopWidth="1px" my={8} {...props} />
      )
    }
  }),
  table: props => ({
    name: 'Table',
    render () {
      return (
        <CBox overflowX="auto">
          <CBox as="table" textAlign="left" mt="32px" width="full" {...props}>
            {this.$slots.default}
          </CBox>
        </CBox>
      )
    }
  }),
  th: props => ({
    name: 'THead',
    inject: ['$chakraColorMode'],
    computed: {
      colorMode () {
        return this.$chakraColorMode()
      },
      bg () {
        const bg = { light: 'gray.50', dark: 'whiteAlpha.100' }
        return bg[this.colorMode]
      }
    },
    render () {
      return (
        <CBox
          as="th"
          bg={this.bg}
          fontWeight="semibold"
          p={2}
          fontSize="sm"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  td: props => ({
    name: 'TData',
    render () {
      return (
        <CBox
          as="td"
          p={2}
          borderTopWidth="1px"
          borderColor="inherit"
          fontSize="sm"
          whiteSpace="normal"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  p: props => ({
    name: 'Paragraph',
    render () {
      return (
        <CText
          as="p"
          mt={4}
          lineHeight="tall"
          {...props}
        >
          {this.$slots.default}
        </CText>
      )
    }
  }),
  ul: props => ({
    name: 'UL',
    render () {
      return (
        <CBox
          as="ul"
          pt="8px"
          pl="16px"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  ol: props => ({
    name: 'OL',
    render () {
      return (
        <CBox
          as="ol"
          pt="8px"
          pl="16px"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  li: props => ({
    name: 'ListItem',
    render () {
      return (
        <CBox
          as="li"
          pb="4px"
          {...props}
        >
          {this.$slots.default}
        </CBox>
      )
    }
  }),
  a: props => ({
    name: 'Anchor',
    render (h) {
      const linkProps = routes.includes(props.href)
        ? {
          props: {
            as: 'nuxt-link',
            to: props.href,
            color: 'vue.500'
          }
        }
        : {
          props: {
            isExternal: true,
            color: 'vue.500'
          },
          domProps: {
            href: props.href
          }
        }

      return h('c-link', {
        ...linkProps
      }, this.$slots.default)
    }
  })
}

export default MDXComponents
