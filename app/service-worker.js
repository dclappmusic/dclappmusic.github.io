importScripts("/app/precache-manifest.8e3957e4da7b166b238968cfd2164519.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.setConfig({
  debug: false
});

// workbox.routing.registerRoute(
//     new RegExp('https://www.stepsrelocation-panel.com/api/v1/user_file(.*)'),
//     workbox.strategies.networkFirst({
//         cacheName: 'files'
//     })
// );
