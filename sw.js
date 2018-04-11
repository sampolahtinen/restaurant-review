//Open the cache and load assets into it
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll([
                'index.html',
                'restaurant.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json'
            ]);
        })
    );
});

//Dynamically add all requests ending in ".jpg" to cache
self.addEventListener('fetch',function(event){
    if (event.request.url.endsWith('.jpg')){
        //console.log(event.request.url);
        caches.open('v1').then(function(cache){
            return cache.add(event.request.url);
        }).catch(function () {
            return new Response('Failed to load');
        });
    }
    /*const url = new URL(event.request.url);
    if (url.pathname.startsWith('/restaurant.html')) {
        caches.open('v1').then(cache => { cache.add(event.request.url);
        }).catch(function(error){
            return error;
        });
  } */
});

//Load from cache
self.addEventListener('fetch',function (event) {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith('/restaurant.html')) {
        event.respondWith(
            caches.match('restaurant.html')
            .then(response => response || fetch(event.request)).catch(error =>  error)
        );
        return;
  }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});
