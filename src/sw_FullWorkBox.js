import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

console.log("('------ SW partito");
precacheAndRoute(self.__WB_MANIFEST);

// cleans up cache that is outdated because of a previous version of Workbox.
cleanupOutdatedCaches();

// Get index.html from network first.
registerRoute(
  /(\/|\.html)$/,
  new NetworkFirst({
    cacheName: 'html'
  })
);

// Cache CSS and JS requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
);

// Cache media content coming from Google Drive  with a StaleWhileRevalidate strategy
registerRoute(
  // Check to see if the request's origin is from Google Drive
  // TODO add here other Google Drive related Urls
  ({ request, sameOrigin, url }) => {
      let res = url.startsWith('https://drive.google.com') || url.startsWith('https://docs.google.com');
      console.log(`RegisterRoute, request: ${request}, request.origin: ${request.origin} , url: ${url}, sameOrigin: ${sameOrigin}, return: ${res}`);
      return res;
  },
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'google-drive-media'
    cacheName: 'google-drive-media',
    plugins: [
      // Ensures that only requests that result in a 0 (opaque) and 200 status are cached
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      // Cache expires after 30 days
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
      })
    ]
  })
);

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === 'image',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images-simus',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
      })
    ]
  })
);

self.addEventListener('message', (event) => {
  console.log('------ sw root: message event listener hit. event: ',event);
  switch (event.data && event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      console.log('------ sw root: message SKIP_WAITING called.');
      break;
  }
});

self.addEventListener('fetch', (event) => {
  console.log(`------ sw root: fetch event listener hit. event.request.destination: ${event.request.destination}, event.request.url: ${event.request.url} `);
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function(error) {
      // If both fail, show a generic fallback:
      console.error("---MAU--- Fetch error. Fallback su thumbnails/photoPlaceholder.png",error);
      return fetch("./thumbnails/photoPlaceholder.png", { mode: "no-cors" });
      // return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );  
});
