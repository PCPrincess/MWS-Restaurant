let staticCache = 'restaurant-static';
let imagesCache = 'restaurant-images';

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(staticCache).then(function(cache) {
        return cache.addAll([
          '/',
          'index.html*',
          'restaurant.html',
          '/js',
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
  let fetcher = event.request;
  if (requestUrl.indexOf("restaurant.html") > -1) {
    const urlExist = "restaurant.html";
    fetcher = new Request(urlExist);
  }
  if (requestUrl.hostname !== "localhost") {
    event.request.mode = "no-cors";
  }

  event.respondWith(
      caches.match(fetcher).then(function(response) {
        return response || fetch(event.request)
            .then(resp => {
              return caches.open(staticCache)
                  .then(cache => {
                    cache.put(event.request, resp.clone());
                    return resp;
                  });
            })
            .catch(error => {
              return new Response("Possible Loss of Connectivity", {
                status: 404,
                statusText: "You are not connected to the internet - try refreshing or check your settings"
              });
            })
      })
  );
});


self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
