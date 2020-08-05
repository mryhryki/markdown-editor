self.addEventListener('install', (event) => {
  console.log('ServiceWorker install:', event)
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate:', event)
})

self.addEventListener('fetch', (event) => {
  console.log('Fetch to:', event.request.url)
  event.respondWith(fetch(event.request));
});
