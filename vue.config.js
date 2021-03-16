module.exports = {
  devServer: {
    https: true,
    disableHostCheck: true,
    port: 8080,
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/wp-content/themes/wsbe/' : '/',
};
