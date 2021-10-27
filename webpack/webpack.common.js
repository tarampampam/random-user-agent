const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestVersionSyncPlugin = require('./plugins/manifest-version-sync')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const randomstring = require('randomstring')
const {VueLoaderPlugin} = require('vue-loader')
const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup.ts'),
    options: path.join(srcDir, 'options.ts'),
    'content-script': path.join(srcDir, 'content-script.ts'),
    background: path.join(srcDir, 'background.ts'),
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
        return !['content-script', 'background'].includes(chunk.name)
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
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __UNIQUE_RUA_COOKIE_NAME__: JSON.stringify(randomstring.generate({length: 16, charset: 'alphabetic'})),
    }),
    new webpack.DefinePlugin({ // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{from: '.', to: '../', context: 'public', globOptions: {ignore: ['**/*.md', '**/*.txt']}}],
    }),
    new ManifestVersionSyncPlugin({
      packagePath: path.join(__dirname, '..', 'package.json'),
      manifestPath: '../manifest.json',
    }),
  ],
}
