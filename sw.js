let staticCache = 'restaurant-static-1';

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(staticCache).then(function(cache) {
        return cache.addAll([
          '/skeleton',
          'index.html*',
          'restaurant.html',
          'js/main.js',
          'js/dbhelper.js',
          'js/restaurant_info.js',
          'js/register.js',
          'data/restaurants.json',
          'css/styles.css',
          'css/normalize.css',
          'css/font-awesome.css'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  let requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }

  }

  event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
  )
});