/**
* Service worker interepts requests for images
* It puts retrieved images in cache for 10 minutes
* If image not found responds with fallback
*/

import { precacheAndRoute } from 'workbox-precaching';

var INVALIDATION_INTERVAL = 60 * 60 * 24 * 30 * 1000; // 30 giorni
var NS = "SIMUS";
var SEPARATOR = "|";
var VERSION = Math.ceil(now() / INVALIDATION_INTERVAL);

const manifest = self.__WB_MANIFEST;

// TODO: capire se è possibile indicare queste url sul vue.config.js(.pwa.manifest)
// precache file aggiuntivi
// MDI ICONS: https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=6.5.95
manifest.push({url: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=6.5.95', revision: null},);
precacheAndRoute(manifest);

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
  // set namespace
  return caches.open(key).then(function (cache) {
    // check cache
    return cache.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      // { mode: "no-cors" } gives opaque response
      // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
      // so we cannot get info about response status
      return fetch(request.clone())
        .then(function (networkResponse) {
          if (networkResponse.type !== "opaque" && networkResponse.ok === false) {
            throw new Error("Resource not available: "+request.url);
          }
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }).catch(function () {
          // debugger;
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

  if (request.method !== "GET" && 
    (!request.url.match(/\.(jpe?g|png|gif|svg)$/) ||
    !request.url.match(/^https:\/\/docs.google.com/) ||
    !request.url.match(/^https:\/\/drive.google.com/))) {
    return;
  }

  event.respondWith(
    proxyRequest(caches, request)
  );

});
