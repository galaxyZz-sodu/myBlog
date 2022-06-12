// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    // @ts-ignore
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // @ts-ignore
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}