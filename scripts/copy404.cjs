// Simple SPA fallback for GitHub Pages: copy index.html to 404.html
// so direct deep-links are served by the SPA.
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const src = resolve('dist', 'index.html')
const dst = resolve('dist', '404.html')

try {
  await copyFile(src, dst)
  console.log('Copied dist/index.html -> dist/404.html')
} catch (e) {
  console.error('Failed to copy 404.html:', e)
  process.exitCode = 0 // do not fail build
}
