const CACHE_NAME = 'sabr-lab-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './Copilot_20251122_185005.png',
  'https://cdn.jsdelivr.net/npm/chart.js' // グラフ描画用ライブラリ
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// リクエスト時にキャッシュがあればそれを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
