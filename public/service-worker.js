const CACHE_NAME = 'v1';
const urlsToCache = ['index.html', 'offline.html', '/static/js/bundle.js']

const self = this;


// Install service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("open cache");
            return cache.addAll(urlsToCache);
        })
    );
});


// Listen for requests
self.addEventListener('fetch', (event) => {
    // if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
    //     event.waitUntil(
    //         this.registration.showNotification("Internet", {
    //             body: "internet not working",
    //         })
    //     )
    // }

    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch(() => caches.match('offline.html'));
        })
    )
}); 

// show notification
// self.addEventListener('push', function(event) {
//     console.log('[Service Worker] Push Received.');
//     console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//     const title = 'Title';
    

//     event.waitUntil(self.registration.showNotification(title, options));
// })


// Activate service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});

