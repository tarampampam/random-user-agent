import { defineConfig, type PluginOption, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import {
  cpSync,
  rmSync,
  linkSync,
  readdirSync,
  statSync,
  createWriteStream,
  mkdirSync,
  writeFileSync,
  renameSync,
} from 'fs'
import archiver from 'archiver'
import randomstring from 'randomstring'
import manifestJson from './manifest.json'
import packageJson from './package.json'
import { locales } from './src/i18n/locales'
import ManifestV3 = chrome.runtime.ManifestV3

const distDir = resolve(__dirname, 'dist')
const distChromeDir = join(distDir, 'chrome')
const distFireFoxDir = join(distDir, 'firefox')
const srcDir = resolve(__dirname, 'src')
const entrypointDir = join(srcDir, 'entrypoints')
const staticDir = resolve(__dirname, 'static')

const uniqueInjectFileName: string = randomstring.generate({ length: 8, charset: 'alphabetic' })
const uniqueHeaderKeyName: string = randomstring.generate({ length: 8, charset: 'alphabetic' })

enum ProjectURLs {
  BUGREPORT = 'https://github.com/tarampampam/random-user-agent/issues/new/choose',
  CHROME = 'https://chromewebstore.google.com/detail/random-user-agent-switche/einpaelgookohagofgnnkcfjbkkgepnp',
  FIREFOX = 'https://addons.mozilla.org/firefox/addon/random_user_agent',
  OPERA = 'https://addons.opera.com/extensions/details/random-user-agent',
  MICROSOFT = 'https://microsoftedge.microsoft.com/addons/detail/random-useragent-switch/addfjgllfhpnacoahmmcafmaacjloded',
}

/** Create _locales directory with messages.json files */
const createLocalesPlugin: PluginOption = {
  name: 'create-locale-files',
  generateBundle() {
    for (const locale in locales) {
      const name = locale as keyof typeof locales
      const data = locales[name]
      const result: Record<string, { message: string }> = {}

      for (const key in data) {
        result[key] = { message: data[key as keyof typeof data] }
      }

      const dirPath = join(distChromeDir, '_locales', name)

      mkdirSync(dirPath, { recursive: true })
      writeFileSync(join(dirPath, 'messages.json'), JSON.stringify(result), { flag: 'w' })
    }
  },
}

/** Copy static content as is */
const copyStaticContentAsIsPlugin: PluginOption = {
  name: 'copy-static-content',
  generateBundle() {
    cpSync(staticDir, distChromeDir, { recursive: true })
  },
}

/** Rename inject.js file to a unique name */
const renameInjectFilePlugin: PluginOption = {
  name: 'rename-inject-file',
  writeBundle() {
    const from = join(distChromeDir, 'inject.js')
    const to = join(distChromeDir, `${uniqueInjectFileName}.js`)

    renameSync(from, to)
  },
}

/** Split dist into chrome and firefox */
const splitChromeAndFirefoxPlugin: PluginOption = {
  name: 'split-chrome-and-firefox',
  writeBundle: {
    sequential: true, // https://rollupjs.org/plugin-development/#build-hooks
    handler() {
      // remove "./dist/firefox" directory
      rmSync(distFireFoxDir, { recursive: true, force: true })
      mkdirSync(distFireFoxDir, { recursive: true })

      const mirror = (from: string, to: string): void => {
        readdirSync(from, { withFileTypes: true })
          .sort()
          .forEach((file) => {
            if (file.name === 'manifest.json') {
              return // skip the manifest.json file
            }

            const fromPath = join(from, file.name)
            const toPath = join(to, file.name)
            const stat = statSync(fromPath)

            if (stat.isDirectory()) {
              mkdirSync(toPath, { recursive: true })
              mirror(fromPath, toPath)
            } else if (stat.isFile() || stat.isSymbolicLink()) {
              linkSync(fromPath, toPath)
            }
          })
      }

      // make a hardlinks of each file in "./dist/chrome" to "./dist/firefox" recursively
      mirror(distChromeDir, distFireFoxDir)
    },
  },
}

/** Create manifest.json file with version from package.json (including other changes) */
const copyAndModifyManifestPlugin: PluginOption = {
  name: 'copy-and-modify-manifest',
  writeBundle: {
    sequential: true,
    handler() {
      const content: Partial<Omit<ManifestV3, 'version'> & { version: string }> = {
        ...manifestJson,
      }

      for (const key in content) {
        if (key.startsWith('$')) {
          delete content[key as keyof typeof content] // remove each key starting with `$` (e.g.: $schema, $docs, etc.)
        }
      }

      // set the version from package.json
      content.version = packageJson.version

      // make injection file accessible from the content script
      content.web_accessible_resources = [{ resources: [`/${uniqueInjectFileName}.js`], matches: ['<all_urls>'] }]

      // for chrome-based browsers
      writeFileSync(join(distChromeDir, 'manifest.json'), JSON.stringify(content), { flag: 'w' })

      // for firefox
      // https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/
      writeFileSync(
        join(distFireFoxDir, 'manifest.json'),
        JSON.stringify({
          ...content,
          // override background.service_worker with background.scripts
          background: { scripts: [content.background.service_worker], type: content.background.type },
          browser_specific_settings: {
            // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest/updateDynamicRules
            gecko: { strict_min_version: '113.0', id: '{b43b974b-1d3a-4232-b226-eaa2ac6ebb69}' },
            gecko_android: { strict_min_version: '120.0' },
          },
        }),
        { flag: 'w' }
      )
    },
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
    writeBundle: {
      sequential: true,
      async handler() {
        if (config.command !== 'build' || process.argv.includes('--watch')) {
          return // do nothing in dev/watch mode
        }

        {
          // chrome
          const archive = archiver('zip', { zlib: { level: 9 } })

          archive.pipe(createWriteStream(resolve(distDir, 'chrome.zip')))
          archive.directory(distChromeDir, false)

          await archive.finalize()
        }

        {
          // firefox
          const archive = archiver('zip', { zlib: { level: 9 } })

          archive.pipe(createWriteStream(resolve(distDir, 'firefox.zip')))
          archive.directory(distFireFoxDir, false)

          await archive.finalize()
        }
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    [createLocalesPlugin, copyStaticContentAsIsPlugin, renameInjectFilePlugin],
    splitChromeAndFirefoxPlugin,
    [copyAndModifyManifestPlugin, zipDistPlugin()],
  ],
  resolve: {
    alias: {
      '~': srcDir,
    },
  },
  define: {
    __UNIQUE_INJECT_FILENAME__: JSON.stringify(`${uniqueInjectFileName}.js`),
    __UNIQUE_HEADER_KEY_NAME__: JSON.stringify(uniqueHeaderKeyName),

    __BUGREPORT_URL__: JSON.stringify(ProjectURLs.BUGREPORT),
    __CHROME_STORE_URL__: JSON.stringify(ProjectURLs.CHROME),
    __MOZILLA_STORE_URL__: JSON.stringify(ProjectURLs.FIREFOX),
    __OPERA_STORE_URL__: JSON.stringify(ProjectURLs.OPERA),
    __MICROSOFT_STORE_URL__: JSON.stringify(ProjectURLs.MICROSOFT),

    // The events dashboard located here: https://bit.ly/448MU9g
    __MIXPANEL_PROJECT_TOKEN__: JSON.stringify(atob('MGIyYjZhZjJjOTRjYjRiNTcwNmIxMDU3YTUyZjFmYTk=')),

    // The events dashboard located here: https://bit.ly/4aLsR3i
    __GA_MEASUREMENT_ID__: JSON.stringify(atob('Ry0xVjVLNlE2R1A2')), // https://bit.ly/3W5dVZd -> Stream details -> Measurement ID
    __GA_API_SECRET__: JSON.stringify(atob('b1lUTjFvU0ZTeS1OVWJvLUwyZVl3QQ==')), // https://bit.ly/3W5dVZd -> Measurement Protocol API secrets
  },
  root: entrypointDir,
  assetsInclude: 'public/**/*',
  build: {
    outDir: distChromeDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: join(entrypointDir, 'popup', 'index.html'),
        options: join(entrypointDir, 'options', 'index.html'),
        onboard: join(entrypointDir, 'onboard', 'index.html'),
        background: join(entrypointDir, 'background', 'index.ts'),
        content: join(entrypointDir, 'content', 'content.ts'),
        inject: join(entrypointDir, 'content', 'inject.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    sourcemap: false,
  },
  esbuild: {
    legalComments: 'none',
    banner: `
/**
 * Hey there! 👋 Nothing to hide from your scrutiny, right? 😆 This file is
 * part of the Random User-Agent extension, essential for enhancing your
 * anonymity online (not by much, but still).
 *
 * If you encounter any issues, please feel free to file a new issue here:
 *
 * \t${ProjectURLs.BUGREPORT}
 */`.trim(),
  },
  test: {
    root: __dirname,
  },
})
