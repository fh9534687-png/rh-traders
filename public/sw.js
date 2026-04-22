/* Simple, stable service worker for offline + static caching. */
const VERSION = "rh-pwa-v1";
const STATIC_CACHE = `${VERSION}:static`;

const PRECACHE_URLS = ["/", "/offline.html", "/manifest.json", "/icons/icon-192.svg", "/icons/icon-512.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(PRECACHE_URLS);
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
      self.clients.claim();
    })(),
  );
});

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Network-first for navigations (so pages update), with offline fallback.
  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match("/offline.html")) || Response.error();
        }
      })(),
    );
    return;
  }

  // Cache-first for static assets.
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/images/") ||
    /\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const res = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, res.clone()).catch(() => {});
        return res;
      })(),
    );
  }
});

