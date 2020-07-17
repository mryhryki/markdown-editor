const worker: Worker = self as any

worker.addEventListener('message', (event) => {
  console.log('Worker Received:', event.data)

  let count: number = 1
  while (count < 1_000_000_000) { // 先程設定した値に合わせてください
    count++
  }

  worker.postMessage({ result: event.data })
})
