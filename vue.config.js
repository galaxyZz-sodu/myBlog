const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
        '/juejin': {
            target: 'https://e.juejin.cn/',//这里填入你要请求的接口的前缀
            ws:true,//代理websocked
            // changeOrigin:true,//虚拟的站点需要更管origin
            secure: true,                   //是否https接口
            pathRewrite:{
                '^/juejin':''//重写路径
            }
        }
    }
}

})
