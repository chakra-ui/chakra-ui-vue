const components = require('./_components')
const path = require('path')
const fs = require('fs')

const stringToUrl = (str, path = '/') => {
  return `${path}${str
    .toLowerCase()
    .split(' ')
    .join('-')}`
}

components.forEach((component) => {
  const data = `# ${component}`
  const _path = path.resolve(__dirname, './docs/' + stringToUrl(component) + '.mdx')

  fs.writeFile(_path, data, { flag: 'w' }, function (err) {
    if (err) throw err
    console.log("It's saved!")
  })
})
