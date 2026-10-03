import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { ScriptTarget, transpileModule } from 'typescript'
import { describe, expect, test, vi } from 'vitest'

const source = transpileModule(readFileSync(new URL('./content.ts', import.meta.url), 'utf8'), {
  compilerOptions: { target: ScriptTarget.ES2020 },
}).outputText

describe('Firefox fallback injection', () => {
  test.each([true, false])('injects a classic script with head available: %s', (hasHead) => {
    const script = { type: '', src: '', setAttribute: vi.fn() }
    const head = { prepend: vi.fn() }
    const documentElement = { prepend: vi.fn() }
    const createElement = vi.fn(() => script)
    const filename = 'inject-test.js'
    const url = `moz-extension://test/${filename}`
    const getURL = vi.fn(() => url)
    const warn = vi.fn()

    runInNewContext(source, {
      document: { createElement, head: hasHead ? head : null, documentElement },
      chrome: { runtime: { getURL } },
      __UNIQUE_INJECT_FILENAME__: filename,
      console: { warn },
    })

    expect(warn).not.toHaveBeenCalled()
    expect(createElement).toHaveBeenCalledExactlyOnceWith('script')
    expect(script.type).toBe('')
    expect(script.setAttribute).toHaveBeenCalledExactlyOnceWith('id', filename)
    expect(getURL).toHaveBeenCalledExactlyOnceWith(filename)
    expect(script.src).toBe(url)
    expect((hasHead ? head : documentElement).prepend).toHaveBeenCalledExactlyOnceWith(script)
    expect((hasHead ? documentElement : head).prepend).not.toHaveBeenCalled()
  })
})
