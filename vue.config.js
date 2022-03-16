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
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#42b983',
      start_url: '/'
    },
    name: 'Simus PWA',
    shortName: 'Simus',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  }
};
