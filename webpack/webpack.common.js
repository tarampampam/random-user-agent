const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestVersionSyncPlugin = require('./plugins/manifest-version-sync')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup.ts'),
    options: path.join(srcDir, 'options.ts'),
    'content-script': path.join(srcDir, 'content-script.ts'),
    'service-worker': path.join(srcDir, 'service-worker.ts'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist', 'js'),
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return !['content-script', 'service-worker'].includes(chunk.name)
      }
    },
    minimizer: [
      new TerserPlugin(),
      new JsonMinimizerPlugin({
        test: /\.json$/i,
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{from: '.', to: '../', context: 'public'}],
    }),
    new ManifestVersionSyncPlugin({
      packagePath: path.join(__dirname, '..', 'package.json'),
      manifestPath: '../manifest.json',
    }),
  ],
}
