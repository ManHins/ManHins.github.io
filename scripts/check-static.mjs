import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'

const root = '.output/public'
const routes = ['', 'photography', 'journal', 'journal/hello-world', 'lab', 'about']
for (const route of routes) {
  const file = root + '/' + (route ? route + '/' : '') + 'index.html'
  assert.ok(existsSync(file), 'Missing static route: ' + file)
  const html = readFileSync(file, 'utf8')
  assert.ok(html.includes('ManHins'), 'Missing prerendered content: ' + route)
  assert.ok(!/Emma Thompson|ui-pro@nuxt|cal.com/.test(html), 'Template identity leaked: ' + route)
}
assert.ok(existsSync(root + '/.nojekyll'))
assert.ok(existsSync(root + '/404.html'))
assert.ok(existsSync(root + '/favicon.svg'))
console.log('Static output verified: 6 pages, 404, favicon and .nojekyll.')
