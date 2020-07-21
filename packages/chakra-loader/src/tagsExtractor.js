import { readFileSync } from 'fs'
import {
  compile,
  parseComponent
} from 'vue-template-compiler'

/** Extracts all tags from user template */
export async function extractTags (resourcePath) {
  const tags = new Set()
  const file = (await readFileSync(resourcePath)).toString('utf8')
  const component = parseComponent(file)

  if (component.template) {
    // If user uses pug as template language,
    // special handling is required
    if (component.template.lang === 'pug') {
      try {
        const pug = require('pug')
        component.template.content = pug.render(component.template.content, { filename: resourcePath })
      } catch (err) {
        /* Ignore compilation errors, they'll be picked up by other loaders */
      }
    }
    compile(component.template.content, {
      modules: [{
        postTransformNode: (el) => {
          tags.add(el.tag)
        }
      }]
    })
  }

  return [...tags]
}
