/**
 * @author https://github.com/ElForastero
 * @link https://github.com/ElForastero/webpack-manifest-version-sync-plugin/blob/master/index.js
 */
const fs = require('fs')
const webpack = require('webpack')

class ManifestVersionSyncPlugin {
  constructor(options) {
    const defaultOptions = {
      manifestPath: 'manifest.json',
      packagePath: 'package.json',
    }

    this.options = { ...defaultOptions, ...options }
  }

  apply(compiler) {
    const pluginName = 'ManifestVersionSyncPlugin'
    const { Compilation } = webpack
    const { RawSource } = webpack.sources
    const { packagePath, manifestPath } = this.options

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
        },
        (assets) => {
          const { version } = JSON.parse(fs.readFileSync(packagePath).toString())
          const manifest = JSON.parse(assets[manifestPath].source().toString())
          const content = JSON.stringify({ ...manifest, version }, undefined, 2)

          compilation.updateAsset(
            manifestPath,
            new RawSource(content)
          )
        }
      )
    })
  }
}

module.exports = ManifestVersionSyncPlugin
