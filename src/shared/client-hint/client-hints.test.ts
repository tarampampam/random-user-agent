import { describe, expect, test } from 'vitest'
import { browserBrands, isMobile, platform } from './client-hints'

describe('client hints', () => {
  test('browserBrands', () => {
    expect(browserBrands('chrome', 98.4)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99' },
      { brand: 'Google Chrome', version: '98' },
      { brand: 'Chromium', version: '98' },
    ])

    expect(browserBrands('chrome', '98.0.0.0')).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Google Chrome', version: '98' },
      { brand: 'Chromium', version: '98' },
    ])

    expect(browserBrands('opera', 11, 22)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99' },
      { brand: 'Opera', version: '11' },
      { brand: 'Chromium', version: '22' },
    ])

    expect(browserBrands('opera', '11.1', 22.2)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Opera', version: '11' },
      { brand: 'Chromium', version: '22' },
    ])

    expect(browserBrands('opera', '11.1', '33.33.33.33')).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Opera', version: '11' },
      { brand: 'Chromium', version: '33' },
    ])

    expect(browserBrands('opera', '11.1', '')).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Opera', version: '11' },
    ])

    expect(browserBrands('edge', 11, 22)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99' },
      { brand: 'Microsoft Edge', version: '11' },
      { brand: 'Chromium', version: '22' },
    ])

    expect(browserBrands('edge', '11.1', 22.2)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Microsoft Edge', version: '11' },
      { brand: 'Chromium', version: '22' },
    ])

    // not a number
    expect(browserBrands('edge', 'not-a-version', 'not-a-version')).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99.0.0.0' },
      { brand: 'Microsoft Edge', version: '0' },
      { brand: 'Chromium', version: '0' },
    ])

    // negative number
    expect(browserBrands('edge', -1, -1)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99' },
      { brand: 'Microsoft Edge', version: '0' },
      { brand: 'Chromium', version: '0' },
    ])

    // infinity
    expect(browserBrands('edge', +Infinity, -Infinity)).toStrictEqual([
      { brand: '(Not(A:Brand', version: '99' },
      { brand: 'Microsoft Edge', version: '0' },
      { brand: 'Chromium', version: '0' },
    ])
  })

  test('platform', () => {
    expect(platform('windows')).toBe('Windows')
    expect(platform('linux')).toBe('Linux')
    expect(platform('macOS')).toBe('macOS')
    expect(platform('iOS')).toBe('iOS')
    expect(platform('android')).toBe('Android')
    expect(platform('unknown')).toBe('Unknown')

    expect(platform('   WiNdOwS ')).toBe('Windows')
    expect(platform('LiNuX   ')).toBe('Linux')
    expect(platform('ios')).toBe('iOS')
  })

  test('isMobile', () => {
    expect(isMobile('iOS')).toBe(true)
    expect(isMobile('android')).toBe(true)
    expect(isMobile('windows')).toBe(false)
    expect(isMobile('linux')).toBe(false)
    expect(isMobile('macOS')).toBe(false)
    expect(isMobile('unknown')).toBe(false)

    expect(isMobile('   WiNdOwS ')).toBe(false)
    expect(isMobile('LiNuX   ')).toBe(false)
    expect(isMobile('ios')).toBe(true)
    expect(isMobile(' aNdRoId ')).toBe(true)
  })
})
