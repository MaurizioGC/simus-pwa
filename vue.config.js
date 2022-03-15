// workboxOptions: {
//   runtimeCaching: [{
//     urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//     handler: 'cacheFirst',
//     options: {
//       cacheName: 'google-fonts',
//       expiration: {
//         maxEntries: 30
//       },
//       cacheableResponse: {
//         statuses: [0, 200]
//       }
//     }
//   }]
// }
// pwa: {
//   workboxOptions: {
//     runtimeCaching: [{
//       urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//       handler: 'networkFirst',
//       options: {
//         cacheName: 'google-fonts',
//         expiration: {
//           maxEntries: 30
//         },
//         cacheableResponse: {
//           statuses: [0, 200]
//         }
//       }
//     }]
//   }
// }
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#42b983"
    },
    // workboxOptions: {
    //   runtimeCaching: [{
    //     urlPattern: new RegExp('^https://drive.google.com/'),
    //     method: "GET",
    //     handler: 'StaleWhileRevalidate',
    //     options: {
    //       cacheName: 'preferiti',
    //       expiration: {
    //         maxEntries: 30
    //       },
    //       cacheableResponse: {
    //         statuses: [0, 200]
    //       }
    //     }
    //   }]
    // }
  }
};
