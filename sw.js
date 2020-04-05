const CACHE_NAME = 'Cache:1.0.0'

const openCache = () => caches.open(CACHE_NAME)

const fetchOrCache = async (request) => {
  const cache = await openCache()
  try {
    const networkResponse = await fetch(request)
    await cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (err) {
    console.error('Fetch error:', err.message)
    return cache.match(request)
  }
}

self.addEventListener('install', (event) => {
  console.log('ServiceWorker install:', event)
  event.waitUntil(openCache().then(() => console.log('Opened cache:', CACHE_NAME)))
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate:', event)
})

self.addEventListener('fetch', (event) => {
  console.log('Fetch to:', event.request.url)
  event.respondWith(fetchOrCache(event.request))
})
