/* ===================================================
   sw.js — Service Worker 离线缓存
   =================================================== */

var CACHE_NAME = 'rheuma-tools-v1';
var urlsToCache = [
  './',
  'index.html',
  'css/style.css',
  'js/engine.js',
  'js/data-criteria.js',
  'js/data-scores.js',
  'js/app.js'
];

// 安装：预缓存核心资源
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// 请求拦截：缓存优先策略
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        // 离线情况下返回缓存，如果也没缓存则返回空
        return new Response('离线模式，资源不可用');
      });
    })
  );
});
