import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

const context: Worker = self as any

context.addEventListener('message', (event) => {
  const { markdown } = event.data
  const html = sanitizeHtml(
    marked(markdown),
    { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img']) },
  )
  context.postMessage({ html })
})
