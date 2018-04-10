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
    )
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
});

/*
//Store google to cache
self.addEventListener('fetch',function(event){
    if(event.request.url.includes('https://maps.googleapis.com/maps/api/js')) {
        console.log(event.request.url);
            caches.open('v1').then(function(cache){
                return cache.add(event.request.url);
            })
    }
});
*/

//Load from cache
self.addEventListener('fetch',function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});