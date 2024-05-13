import { describe, expect, test } from 'vitest'
import { chrome, edge, firefox, opera, safari } from './browser-versions'

describe('version', () => {
  test('randomChromeVersion', async () => {
    for (let i = 0; i < 300; i++) {
      const [major, full] = chrome()

      expect(major).toBeGreaterThanOrEqual(122)
      expect(full).toMatch(/^\d{2,3}\.0\.\d{4}\.\d{2,3}$/)
    }
  })

  test('randomFirefoxVersion', async () => {
    for (let i = 0; i < 300; i++) {
      const [major, full] = firefox()

      expect(major).toBeGreaterThanOrEqual(121)
      expect(full).toMatch(/^\d{2,3}\.0/)
    }
  })

  test('randomOperaVersion', async () => {
    for (let i = 0; i < 300; i++) {
      const [major, full] = opera()

      expect(major).toBeGreaterThanOrEqual(102)
      expect(full).toMatch(/^\d{2,3}\.0\.\d{4}\.\d{2,3}$/)
    }
  })

  test('randomSafariVersion', async () => {
    for (let i = 0; i < 300; i++) {
      const [major, full] = safari()

      expect(major).toBeGreaterThanOrEqual(614)
      expect(full).toMatch(/^\d{3}\.\d{1,2}(\.\d{1,2}|)$/)
    }
  })

  test('randomEdgeVersion', async () => {
    for (let i = 0; i < 30; i++) {
      const [major, full] = edge()

      expect(major).toBeGreaterThanOrEqual(102)
      expect(full).toMatch(/^\d{3}\.0\.\d{3,4}\.\d{1,3}$/)
    }
  })
})
