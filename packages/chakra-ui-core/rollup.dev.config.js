import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import buble from 'rollup-plugin-buble'
import scss from 'rollup-plugin-scss'
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
    resolve({
      extensions: ['.vue', '.js']
    }),
    scss({
      output: false
    }),
    bubelConfig,
    babelConfig,
    vueConfig,
    cjs({
      namedExports: {
        'node_modules/object-assign/index.js': ['assign']
      },
      include: /node_modules/
    }),
    production && terser()
  ]
}

const baseFolder = './src/'

const components = fs.readdirSync(baseFolder)
  .filter(f => fs.statSync(path.join(baseFolder, f)).isDirectory())

const entries = {
  index: './src/index.js',
  ...components.reduce((obj, name) => {
    obj[name] = (baseFolder + name + '/index.js')
    return obj
  }, {})
}

/**
 * Configurations
 */
export default () => {
  const config = [{
    input: entries,
    output: {
      dir: 'dist/esm/',
      format: 'esm'
    },
    ...commons
  }
  ]
  return config
}
