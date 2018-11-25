const cacheName = 'restaurant-v1';

const filesCache = [
	'./',
	'index.html',
	'restaurant.html',
	'css/styles.css',
	'data/restaurants.json',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg' 
];


//calling the installing event
self.addEventListener('install', (evt) => {
	console.log('Service Worker Installed');
	evt.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			console.log('Service Worker: Caching Files');
			cache.addAll(filesCache);
		})
		.then(() => self.skipWaiting())
	);
});

//calling the activating the event
self.addEventListener('activate', (evt) => {
	console.log('Service Worker Activated');
	// removing unwanted caches
	evt.waitUntil(
		caches.keys().then(cacheName => { 
			Promise.all(cacheName.map(cache => {
					if(cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			)
		})
	);
});

//calling Fetch Event
self.addEventListener('fetch', (evt) => {
	if(evt.request.url.startsWith(self.location.origin)) {
		evt.respondWith(
			caches.match(evt.request)
			.then(response => {
				if(response) {
					return response;
				} return fetch(evt.request);
			})
		);
	}
});