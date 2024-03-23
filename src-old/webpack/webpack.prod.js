const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            {
              source: path.join(__dirname, '..', 'dist'),
              destination: path.join(__dirname, '..', 'dist.zip')
            },
            // {
            //   source: path.join(__dirname, '..', 'dist'),
            //   destination: path.join(__dirname, '..', 'dist.tar.gz'),
            //   format: 'tar',
            //   options: {
            //     // see https://www.archiverjs.com/docs/archiver
            //     gzip: true,
            //     gzipOptions: {
            //       level: 7,
            //     },
            //     globOptions: {
            //       dot: true, // https://github.com/Yqnn/node-readdir-glob#options
            //     }
            //   },
            // },
          ],
        },
      },
    })
  ],
})
