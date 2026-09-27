const CACHE_NAME = "miroooo-smile-coach-v2";
const APP_SHELL = [
  "/smile-coach",
  "/smile-coach.html",
  "/smile-coach.webmanifest",
  "/assets/smile-coach.css?v=20260902",
  "/assets/smile-coach.js?v=20260902",
  "/favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Only handle requests specifically within the /smile-coach app scope
  if (request.mode === "navigate" && url.pathname.startsWith("/smile-coach")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/smile-coach", copy));
          return response;
        })
        .catch(() => caches.match("/smile-coach"))
    );
    return;
  }

  // Only cache and handle smile-coach dedicated assets, never global storefront assets
  if (url.pathname.startsWith("/assets/smile-coach")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
