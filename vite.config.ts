import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {join, resolve} from 'path'
import manifestJson from './manifest.json'
import packageJson from './package.json'
import {Plugin} from 'rollup'
import {writeFile} from 'fs'

const distDir = resolve(__dirname, 'dist')
const srcDir = resolve(__dirname, 'src')

const copyManifestPlugin = (): Plugin => {
  return {
    name: 'copy-manifest',
    closeBundle() {
      writeFile(
        join(distDir, 'manifest.json'),
        JSON.stringify({
          ...manifestJson,
          version: packageJson.version,
        }),
        {flag: 'w'},
        (error) => {
          if (error) {
            throw error
          }
        },
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyManifestPlugin(),
  ],
  resolve: {
    alias: {
      '~': srcDir,
    },
  },
  root: join(srcDir, 'pages'),
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
