import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

const context: Worker = self as any

context.addEventListener('message', (event) => {
  const { markdown } = event.data
  const html = sanitizeHtml(marked(markdown))
  context.postMessage({ html })
})
