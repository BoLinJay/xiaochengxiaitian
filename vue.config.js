const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  },
   // 这个是给webpack-dev-server开启可IP和域名访问权限。
   devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    },
    //这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
    configureWebpack: {
      externals: {
        qc: 'QC'
      }
    }
})
