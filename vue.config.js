module.exports = {
  devServer: {
    https: true,
    disableHostCheck: true,
    port: 8080,
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/wp-content/themes/wsbe/' : '/',
  pwa: {
    name: 'Waste Separation',
    themeColor: '#000',
    msTileColor: '#fff',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js',
      swDest: 'service-worker.js',
    },
  },
};
