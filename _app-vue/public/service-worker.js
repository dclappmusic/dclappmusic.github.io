workbox.setConfig({
  debug: false
});

// workbox.routing.registerRoute(
//     new RegExp('https://www.stepsrelocation-panel.com/api/v1/user_file(.*)'),
//     workbox.strategies.networkFirst({
//         cacheName: 'files'
//     })
// );