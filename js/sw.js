const CACHE_NAME = "v2.8.0";
const URLS_TO_CACHE = [
    "../index.html",

    "../data/docs.json",
    "../data/examples.json",
    "../data/lessons.json",
    
    "../codemirror/codemirror.css",
    "../codemirror/addon/fold/foldgutter.css",
    "../css/style.css",

    "../codemirror/codemirror.js",
    "../codemirror/formatting.js",

    "../codemirror/addon/runmode/runmode.js",
    "../codemirror/mode/javascript/javascript.js",

    "../codemirror/addon/fold/foldcode.js",
    "../codemirror/addon/fold/foldgutter.js",
    "../codemirror/addon/fold/brace-fold.js",
    "../codemirror/addon/fold/comment-fold.js",

    "../codemirror/addon/edit/closebrackets.js",
    "../codemirror/addon/selection/active-line.js",

    "./jquery-resizable.min.js",
    "./jquery-resizable.min.js.map",
    "./jquery.slim.min.js",

    "./lzma.js",
    "./lzma_worker.js",

    "./api.js",
    "./jeroo.js",
    "./app.js"
];

/**
 * This event runs when the service worker first gets registered and installed.
 */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

/**
 * This event runs when the ServiceWorker is updated.
 */
self.addEventListener("activate", event => {
    const cacheWhitelist = [];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1)
                        return caches.delete(cacheName);
                })
            );
        })
    );
});

/**
 * Intercept network calls. Send from cache or network.
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});