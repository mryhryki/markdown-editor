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

self.addEventListener('fetch', (event) => {
  console.log('Fetch to:', event.request.url)
  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then((cache) => fetch(event.request)
        .then((networkResponse) => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        }).catch((err) => {
          console.error('Fetch error:', err.message)
          return caches.open(CACHE_NAME).then((cache) => cache.match(event.request))
        }),
      ),
  )
})
