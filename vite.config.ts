import { defineConfig, type PluginOption, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { cpSync, createWriteStream, mkdirSync, writeFileSync } from 'fs'
import archiver from 'archiver'
import manifestJson from './manifest.json'
import packageJson from './package.json'
import { locales } from './src/i18n/locales'

// const archiver = require('archiver')

const distDir = resolve(__dirname, 'dist')
const srcDir = resolve(__dirname, 'src')
const staticDir = resolve(__dirname, 'static')

/** Create manifest.json file with version from package.json */
const copyManifestPlugin: PluginOption = {
  name: 'copy-manifest',
  writeBundle() {
    const content: Partial<{ $schema: string; version: string }> = { ...manifestJson }

    for (const key in content) {
      if (key.startsWith('$')) {
        delete content[key as keyof typeof content] // remove each key starting with `$` (e.g.: $schema, $docs, etc.)
      }
    }

    content.version = packageJson.version // set version from package.json

    writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(content), { flag: 'w' })
  },
}

/** Create _locales directory with messages.json files */
const createLocalesPlugin: PluginOption = {
  name: 'create-locale-files',
  writeBundle() {
    for (const locale in locales) {
      const name = locale as keyof typeof locales
      const data = locales[name]
      const result: Record<string, { message: string }> = {}

      for (const key in data) {
        result[key] = { message: data[key as keyof typeof data] }
      }

      const dirPath = join(distDir, '_locales', name)

      mkdirSync(dirPath, { recursive: true })
      writeFileSync(join(dirPath, 'messages.json'), JSON.stringify(result), { flag: 'w' })
    }
  },
}

/** Copy static content as is */
const copyContentAsIsPlugin: PluginOption = {
  name: 'copy-static-content',
  writeBundle() {
    cpSync(staticDir, distDir, { recursive: true })
  },
}

/** Create dist.zip file */
const zipDistPlugin = (): PluginOption => {
  let config: ResolvedConfig

  return {
    name: 'zip-dist',
    configResolved(cfg) {
      config = cfg
    },
    async writeBundle() {
      if (config.command !== 'build' || process.argv.includes('--watch')) {
        return // do nothing in dev/watch mode
      }

      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.pipe(createWriteStream(resolve(__dirname, 'dist.zip')))
      archive.directory(distDir, false)

      await archive.finalize()
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyManifestPlugin, createLocalesPlugin, copyContentAsIsPlugin, zipDistPlugin()],
  resolve: {
    alias: {
      '~': srcDir,
    },
  },
  root: join(srcDir, 'pages'),
  assetsInclude: 'public/**/*',
  build: {
    outDir: distDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: join(srcDir, 'pages', 'popup', 'index.html'),
        options: join(srcDir, 'pages', 'options', 'index.html'),
        background: join(srcDir, 'pages', 'background', 'index.ts'),
        content: join(srcDir, 'pages', 'content', 'index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    sourcemap: false,
  },
})
