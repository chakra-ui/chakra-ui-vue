import { css } from 'emotion'
import { CHeading, CBox, Css, CPseudoBox, CCode } from '@chakra-ui/vue'
import { stringToUrl } from '~/utils'
import CodeBlock from './CodeBlock'

const Heading = {
  name: 'Heading',
  inject: ['$chakraTheme'],
  computed: {
    theme () {
      return this.$chakraTheme()
    }
  },
  extends: CBox,
  render (h) {
    const text = this.$slots.default[0].text

    return h(CHeading, {
      props: {
        ...this.$props,
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
        props: {
          display: 'inline-block'
        },
        domProps: {
          ...text && { id: stringToUrl(text, '') }
        }
      }, [
        this.$slots.default,
        h(CPseudoBox, {
          props: {
            as: 'a',
            color: 'vue.500',
            fontWeight: 'normal',
            outline: 'none',
            _focus: { opacity: 1, boxShadow: 'outline' },
            opacity: '0',
            ml: '0.375rem'
          },
          attrs: {
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
        <CCode variantColor="yellow" fontSize="0.84em" {...props}>
          {this.$slots.default}
        </CCode>
      )
    }
  }),
  code: CodeBlock,
  pre: props => ({
    name: 'Box',
    render () {
      return (
        <CBox my="3" {...props}>
          {this.$slots.default}
        </CBox>
      )
    }
  })
}

export default MDXComponents
