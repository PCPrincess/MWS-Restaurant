let staticCache = 'restaurant-static-1';

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(staticCache).then(function(cache) {
        return cache.addAll([
          '/',
          'index.html',
          'restaurant.html',
          'sw.js',
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

self.addEventListener('fetch', function (event) {
  /*let requestUrl = new URL(event.request.url);
  if (requestUrl.origin === 'http://localhost:8080') {
    event.respondWith(caches.match('/'));
  }*/
  event.respondWith(
      caches.match(event.request, {ignoreSearch: true}).then(function (response) {
        return response || fetch(event.request);
      })
  )
});



