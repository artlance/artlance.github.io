importScripts('sw-toolbox.js');

toolbox.precache([
  '/style.css',
  '/single.html',
  '/index.html',
  '/js/jquery.min.js',
  '/js/migrate.min.js',
  '/js/library.min.js',
  '/js/script.min.js'
]);

toolbox.router.get('/upload/*', toolbox.cacheFirst);

toolbox.router.get('*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});