// eslint-disable-next-line no-global-assign
require = require('esm')(module /*, options */)
require('../src/cli').cli(process.argv)
