const workerVersion = 1;

const filesArray = [
    `/`,
    `/images`,
    `/orders`,
    `/orders/one`,
    `/orders/two`,
    `/orders/three`,
    `/forms`,
    `/favicon.ico`,
    `/index_bundle.js`,
    `/sw-install.js`
];

self.addEventListener(`install`, async (event) => {
    // delete old cache
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== `tool` + workerVersion) caches.delete(key);
            }));
        })
    );
    // add new cache
    event.waitUntil(
        caches.open('tool-' + workerVersion).then((cache) => {
            return cache.addAll(filesArray);
        })
    );
});

self.addEventListener(`fetch`, (event) => {
    event.respondWith(async function() {
        const cache = await caches.open(`tool-` + workerVersion);
        const cachedData = await cache.match(event.request);
        if (cachedData) return cachedData;
        return fetch(event.request);
    }());
});

self.addEventListener(`message`, async (event) => {
    if (event.data === `SKIP_WAITING`) await self.skipWaiting();
});