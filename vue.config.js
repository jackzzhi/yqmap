// vue.config.js
const path = require('path');
function resolve (dir) {

    return path.join(__dirname, dir)

}
module.exports = {
    lintOnSave: true,
    publicPath:"./",
    outputDir:"map",
    assetsDir:"assets",
    css: {
      loaderOptions: {
          css: {
              // options here will be passed to css-loader
          },
          postcss: {
              // options here will be passed to postcss-loader
              plugins: [require('postcss-px2rem')({
                  remUnit: 192
              })]
          }
      }
  },
    chainWebpack: (config) => {

        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('services',resolve('src/services'))
            .set('common',resolve('src/common'))
            .set('mixins',resolve('src/mixins'))
    }
}
