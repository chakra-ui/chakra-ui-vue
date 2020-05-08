module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lodash-es)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@chakra-ui/theme-vue': require.resolve('./packages/chakra-ui-theme/src/index.js'),
    '\\.css$': require.resolve('./tests/test-utils/style-mock.js'),
    'breadstick': require.resolve('./tests/test-utils/module-mock.js')
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
