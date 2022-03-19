/**
* Service worker interepts requests for images
* It puts retrieved images in cache for 10 minutes
* If image not found responds with fallback
*/

var INVALIDATION_INTERVAL = 60 * 60 * 24 * 30 * 1000; // 30 giorni
var NS = "MAGE";
var SEPARATOR = "|";
var VERSION = Math.ceil(now() / INVALIDATION_INTERVAL);

/**
 * Helper to get current timestamp
 * @returns {Number}
 */
function now () {
  var d = new Date();
  return d.getTime();
}

/**
 * Build cache storage key that includes namespace, url and record version
 * @param {String} url
 * @returns {String}
 */
function buildKey (url) {
  return NS + SEPARATOR + url + SEPARATOR + VERSION;
}

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} RecordKey
 * @property {String} ns - namespace
 * @property {String} url - request identifier
 * @property {String} ver - record varsion
 */

/**
 * Parse cache key
 * @param {String} key
 * @returns {RecordKey}
 */
function parseKey (key) {
  var parts = key.split(SEPARATOR);
  return {
    ns: parts[0],
    key: parts[1],
    ver: parseInt(parts[2], 10)
  };
}

/**
 * Invalidate records matchinf actual version
 *
 * @param {Cache} caches
 * @returns {Promise}
 */
function purgeExpiredRecords (caches) {
  console.log("Purging...");
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys.map(function (key) {
        var record = parseKey(key);
        if (record.ns === NS && record.ver !== VERSION) {
          console.log("deleting", key);
          return caches.delete(key);
        }
      })
    );
  });
}

/**
 * Proxy request using cache-first strategy
 *
 * @param {Cache} caches
 * @param {Request} request
 * @returns {Promise}
 */
function proxyRequest(caches, request) {
  var key = buildKey(request.url);
  console.log("----: cache buildKey: "+key);
  // set namespace
  return caches.open(key).then(function (cache) {
    // check cache
    return cache.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        console.info("----: Take it from cache", request.url);
        return cachedResponse;
      }
      // { mode: "no-cors" } gives opaque response
      // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
      // so we cannot get info about response status
      return fetch(request.clone())
        .then(function (networkResponse) {
          console.log('----: dentro then di fetch');
          if (networkResponse.type !== "opaque" && networkResponse.ok === false) {
            throw new Error("Resource not available: "+request.url);
          }
          console.info("----: Fetch it through Network", request.url, networkResponse.type);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }).catch(function () {
          // debugger;
          console.info("----: Failed to fetch", request.url);
          // Placeholder image for the fallback
          return fetch("./thumbnails/photoPlaceholder.png", { mode: "no-cors" });
        });
    });
  });
}


self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(purgeExpiredRecords(caches));
});

self.addEventListener("fetch", function (event) {
  var request = event.request;

  console.log("Detected request", request.method , request.url );
  console.log("(!request.url.match(/\.(jpe?g|png|gif|svg)$/)",!request.url.match(/\.(jpe?g|png|gif|svg)$/));
  console.log("!request.url.match(/^https:\/\/docs.google.com/)",!request.url.match(/^https:\/\/docs.google.com/));
  console.log("!request.url.match(/^https:\/\/drive.google.com/)",!request.url.match(/^https:\/\/drive.google.com/));

  if (request.method !== "GET" && 
    (!request.url.match(/\.(jpe?g|png|gif|svg)$/) ||
    !request.url.match(/^https:\/\/docs.google.com/) ||
    !request.url.match(/^https:\/\/drive.google.com/))) {
    console.log("----: Return from Fecth NO IMAGE OR GDRIVE ITEM TO CACHE");
    return;
  }

  console.log("Accepted request", request.url);

  event.respondWith(
    proxyRequest(caches, request)
  );

});

// import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// console.log("('------ SW partito");
// precacheAndRoute(self.__WB_MANIFEST);

// // cleans up cache that is outdated because of a previous version of Workbox.
// cleanupOutdatedCaches();

// // Get index.html from network first.
// registerRoute(
//   /(\/|\.html)$/,
//   new NetworkFirst({
//     cacheName: 'html'
//   })
// );

// // Cache CSS and JS requests with a Stale While Revalidate strategy
// registerRoute(
//   // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
//   ({ request }) =>
//     request.destination === 'style' ||
//     request.destination === 'script',
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'assets'
//     cacheName: 'assets',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200]
//       })
//     ]
//   })
// );

// // Cache media content coming from Google Drive  with a StaleWhileRevalidate strategy
// registerRoute(
//   // Check to see if the request's origin is from Google Drive
//   // TODO add here other Google Drive related Urls
//   ({ request, sameOrigin, url }) => {
//       let res = url.startsWith('https://drive.google.com') || url.startsWith('https://docs.google.com');
//       console.log(`RegisterRoute, request: ${request}, request.origin: ${request.origin} , url: ${url}, sameOrigin: ${sameOrigin}, return: ${res}`);
//       return res;
//   },
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'google-drive-media'
//     cacheName: 'google-drive-media',
//     plugins: [
//       // Ensures that only requests that result in a 0 (opaque) and 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       // Cache expires after 30 days
//       new ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
//       })
//     ]
//   })
// );

// // Cache images with a Cache First strategy
// registerRoute(
//   // Check to see if the request's destination is style for an image
//   ({ request }) => request.destination === 'image',
//   // Use a Cache First caching strategy
//   new CacheFirst({
//     // Put all cached files in a cache named 'images'
//     cacheName: 'images-simus',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200]
//       }),
//       // Don't cache more than 50 items, and expire them after 30 days
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
//       })
//     ]
//   })
// );

// self.addEventListener('message', (event) => {
//   console.log('------ sw root: message event listener hit. event: ',event);
//   switch (event.data && event.data.type) {
//     case 'SKIP_WAITING':
//       self.skipWaiting();
//       console.log('------ sw root: message SKIP_WAITING called.');
//       break;
//   }
// });

// self.addEventListener('fetch', (event) => {
//   console.log(`------ sw root: fetch event listener hit. event.request.destination: ${event.request.destination}, event.request.url: ${event.request.url} `);
//   event.respondWith(
//     // Try the cache
//     caches.match(event.request).then(function(response) {
//       // Fall back to network
//       return response || fetch(event.request);
//     }).catch(function(error) {
//       // If both fail, show a generic fallback:
//       console.error("---MAU--- Fetch error. Fallback su thumbnails/photoPlaceholder.png",error);
//       return fetch("./thumbnails/photoPlaceholder.png", { mode: "no-cors" });
//       // return caches.match('/offline.html');
//       // However, in reality you'd have many different
//       // fallbacks, depending on URL & headers.
//       // Eg, a fallback silhouette image for avatars.
//     })
//   );  
// });
