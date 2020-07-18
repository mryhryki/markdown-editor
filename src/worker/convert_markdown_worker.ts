import * as marked from 'marked'

const worker: Worker = self as any

worker.addEventListener('message', (event) => {
  const text = event.data
  const html = marked(text)
  worker.postMessage({ html })
})
