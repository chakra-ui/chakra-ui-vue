const Module = require('module')
const { camelCase, kebabCase, upperFirst } = require('lodash')

/**
 * Transforms component name to PascalCase
 * @param {String} string
 * @returns {String}
 */
const pascalCase = string => upperFirst(camelCase(string))

/** Loads Chakra components and sakes them in array */
function loadChakraComponents () {
  const components = []
  const _export = Module._load(require.resolve('@chakra-ui/vue'))
  for (const componentName in _export) {
    if (!(componentName.startsWith('C') && _export[componentName].name.startsWith('C'))) continue
    const componentOptions = {
      pascalName: pascalCase(componentName),
      kebabName: kebabCase(componentName),
      ..._export[componentName]
    }
    components.push(componentOptions)
  }

  return components
}

const components = loadChakraComponents()

module.exports = {
  kebabCase,
  pascalCase,
  getComponents: () => components
}
