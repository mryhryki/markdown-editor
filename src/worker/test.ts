const worker: Worker = self as any

worker.addEventListener('message', (event) => {
  console.log('Worker Received:', event.data)
  worker.postMessage({ result: event.data })
})
