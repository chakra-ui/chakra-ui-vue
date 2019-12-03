import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import buble from 'rollup-plugin-buble'

const production = !process.env.ROLLUP_WATCH

// Plugins
const bubelConfig = buble({
  objectAssign: 'Object.assign',
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

const commons = {
  plugins: [
    resolve(),
    bubelConfig,
    babelConfig,
    cjs(),
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
        format: 'esm'
      }
    ],
    ...commons
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/es/index.js`,
        format: 'es'
      }
    ],
    ...commons
  },
  {
    input: 'src/index.js',
    output: [
      {
        name: 'KiwiUI',
        file: `dist/umd/index.js`,
        format: 'umd',
        exports: 'named'
      }
    ],
    ...commons
  },
  {
    input: 'src/index.js',
    output: [
      {
        name: 'KiwiUI',
        file: `dist/cjs/index.js`,
        format: 'cjs',
        exports: 'named'
      }
    ],
    ...commons
  }
]
