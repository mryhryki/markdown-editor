const context: Worker = self as any

context.addEventListener('message', (event) => {
  const data = event.data
  context.postMessage(data)
})
