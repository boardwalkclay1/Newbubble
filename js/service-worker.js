const CACHE_NAME = "laundry-bubbles-cache-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/client-dashboard.html",
  "/washer-dashboard.html",
  "/settings.html",
  "/paywall.html",
  "/css/styles.css",
  "/js/index.js",
  "/js/client.js",
  "/js/washer.js",
  "/js/settings.js",
  "/js/auth.js",
  "/js/config.js",
  "/js/location.js",
  "/js/job-details.js",
  "/js/washer-profile.js",
  "/js/client-profile.js",
  "/js/map.js",
  "/manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
