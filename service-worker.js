const CACHE_NAME = 'sabr-lab-v2'; // バージョンをv2に更新
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './Copilot_20251122_185005.png'
  // 'https://cdn.jsdelivr.net/npm/chart.js' // CDNリソースはキャッシュリストから除外
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // 新しいキャッシュ名以外の全てのキャッシュを削除
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
                  .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
