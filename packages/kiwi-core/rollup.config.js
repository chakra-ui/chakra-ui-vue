import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

// Plugins
const bubelConfig = buble({
  objectAssign: 'Object.assign',
  jsx: 'h',
  transforms: {
    dangerousTaggedTemplateString: true,
    dangerousForOf: true
  }
})

const babelConfig = babel({
  exclude: /node_modules/,
  runtimeHelpers: true,
  babelrc: false,
  presets: [
    [
      '@babel/preset-env', {
        modules: false
      }
    ]
  ],
  plugins: [
    'babel-plugin-transform-es2015-for-of'
  ]
})

const vueConfig = vue({
  template: {
    isProduction: true
  }
})

// Externals
const externals = [
  ...Object.keys(pkg.peerDependencies || {})
]

const commons = {
  external: externals,
  plugins: [
    resolve(),
    bubelConfig,
    babelConfig,
    vueConfig,
    cjs({
      include: /node_modules/
    }),
    production && terser()
  ]
}

/**
 * Configurations
 */
export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/esm/index.js`,
        format: 'esm',
        exports: 'named'
      }
    ],
    ...commons
  }
  // {
  //   input: 'src/index.js',
  //   output: [
  //     {
  //       file: `dist/es/index.js`,
  //       format: 'es',
  //       exports: 'named'
  //     }
  //   ],
  //   ...commons
  // },
  // {
  //   input: 'src/index.js',
  //   output: [
  //     {
  //       name: 'KiwiUI',
  //       file: `dist/umd/index.js`,
  //       format: 'umd',
  //       exports: 'named'
  //     }
  //   ],
  //   ...commons
  // },
  // {
  //   input: 'src/index.js',
  //   output: [
  //     {
  //       name: 'KiwiUI',
  //       file: `dist/cjs/index.js`,
  //       format: 'cjs',
  //       exports: 'named'
  //     }
  //   ],
  //   ...commons
  // }
]
