import { describe, expect, test } from 'vitest'
import { allTypes, fromSets, toSets } from './generator-type-helpers.ts'

describe('generator-type-helpers', () => {
  test('toSets', () => {
    type TResult = ReturnType<typeof toSets>

    expect(toSets(['chrome_win', 'chrome_mac'])).toEqual<TResult>([['chrome'], ['macos', 'windows']])
    expect(toSets(['chrome_win', 'chrome_mac', 'chrome_linux'])).toEqual<TResult>([
      ['chrome'],
      ['linux', 'macos', 'windows'],
    ])
    expect(toSets(['chrome_win', 'chrome_mac', 'chrome_linux', 'chrome_android'])).toEqual<TResult>([
      ['chrome'],
      ['android', 'linux', 'macos', 'windows'],
    ])

    expect(toSets([])).toEqual<TResult>([[], []])

    // @ts-expect-error Testing invalid input
    expect(toSets(['foo'])).toEqual<TResult>([[], []])
  })

  test('fromSets', () => {
    type TResult = ReturnType<typeof fromSets>

    expect(fromSets(['chrome'], ['macos', 'windows'])).toEqual<TResult>(['chrome_mac', 'chrome_win'])
    expect(fromSets(['chrome'], ['linux', 'macos', 'windows'])).toEqual<TResult>([
      'chrome_linux',
      'chrome_mac',
      'chrome_win',
    ])
    expect(
      fromSets(['chrome', 'edge', 'firefox', 'opera', 'safari'], ['android', 'linux', 'macos', 'windows', 'ios'])
    ).toEqual<TResult>([...allTypes])

    expect(fromSets(['chrome', 'edge'], 'any')).toEqual<TResult>([
      'chrome_android',
      'chrome_linux',
      'chrome_mac',
      'chrome_win',
      'edge_mac',
      'edge_win',
    ])
    expect(fromSets(['chrome', 'edge', 'firefox', 'opera', 'safari'], 'any')).toEqual<TResult>([...allTypes])

    expect(fromSets('any', ['linux'])).toEqual<TResult>(['chrome_linux', 'firefox_linux'])
    expect(fromSets('any', ['linux', 'macos'])).toEqual<TResult>([
      'chrome_linux',
      'chrome_mac',
      'edge_mac',
      'firefox_linux',
      'firefox_mac',
      'opera_mac',
      'safari_mac',
    ])

    expect(fromSets('any', 'any')).toEqual<TResult>([...allTypes])

    expect(fromSets([], [])).toEqual<TResult>([])

    // @ts-expect-error Testing invalid input
    expect(fromSets(['foo'], [])).toEqual<TResult>([])
  })
})
