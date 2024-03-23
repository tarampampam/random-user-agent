import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { writeFileSync, mkdirSync, cpSync } from 'fs'
import manifestJson from './manifest.json'
import packageJson from './package.json'
import { locales } from './src/locales/locales'
import { Plugin } from 'rollup'

const distDir = resolve(__dirname, 'dist')
const srcDir = resolve(__dirname, 'src')
const staticDir = resolve(__dirname, 'static')

/** Create manifest.json file with version from package.json */
const copyManifestPlugin: Plugin = {
  name: 'copy-manifest',
  writeBundle() {
    writeFileSync(
      join(distDir, 'manifest.json'),
      JSON.stringify({
        ...manifestJson,
        version: packageJson.version,
      }),
      { flag: 'w' }
    )
  },
}

/** Create _locales directory with messages.json files */
const createLocalesPlugin: Plugin = {
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

const copyContentAsIsPlugin: Plugin = {
  name: 'copy-static-content',
  writeBundle() {
    cpSync(staticDir, distDir, { recursive: true })
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyManifestPlugin,
    createLocalesPlugin,
    copyContentAsIsPlugin,
  ],
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
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    sourcemap: false,
  },
})
