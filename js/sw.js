const CACHE_NAME = "v2.1.0";
const URLS_TO_CACHE = [
    "../index.html",
    
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
    "./jquery.slim.min.js",

    "./api.js",
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
 * Intercept network calls.
 */
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            return resp || fetch(event.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());

                    return response;
                });  
            });
        })
    );
});