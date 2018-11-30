'use strict';
importScripts('sw-toolbox.js');
toolbox.precache(["index.html", "css/style.css", "js/jquery.js", "js/library.js", "js/migrate.js", "js/script.js"]);
toolbox.router.get('/upload/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, {
    networkTimeoutSeconds: 20
});
