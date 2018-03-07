let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
      filename: './build/bundle.js'
    },
    watch: true,
    plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          server: { 
              baseDir: ['./','src'],
        }
        })
      ]
};