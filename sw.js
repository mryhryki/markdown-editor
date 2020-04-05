const CACHE_NAME = 'Cache:1.0.0'

self.addEventListener('install', (event) => {
  console.log('ServiceWorker install:', event)
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(() => console.log('Opened cache:', CACHE_NAME)),
  )
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate:', event)
})


