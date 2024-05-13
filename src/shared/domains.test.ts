import { describe, expect, test } from 'vitest'
import { canonizeDomain, deCanonizeDomain } from './domains'

describe('domains', () => {
  test('canonize', () => {
    Object.entries({
      ' https://  www.g00gle.COM/foo?bar=baz&_=123#href': 'www.g00gle.com',
      'http ://google....c/': 'google.c',
      'www.google.com': 'www.google.com',
      'https://кто.рф/': 'xn--j1ail.xn--p1ai',
      'https://點看/': 'xn--c1yn36f',
      '😀': 'xn--e28h',
      'https://habr.com/ru/hub/go/': 'habr.com',
      'xn--j1ail.xn--p1ai': 'xn--j1ail.xn--p1ai',
      '\t\r\nfO\t\r\n o  ': 'foo',
      '    ': '',
      '\r  \n \t  ': '',
      '': '',
    }).map(([give, want]) => {
      expect(canonizeDomain(give)).toBe(want)
    })
  })

  test('deCanonize', () => {
    Object.entries({
      'www.google.com': 'www.google.com',
      'habr.com': 'habr.com',
      'xn--j1ail.xn--p1ai  ': 'кто.рф',
      'xn--c1yn36f': '點看',
      'xn--e28h': '😀',
      '\t\r\nfO\t\r\n o  ': 'foo',
      '    ': '',
      '\r  \n \t  ': '',
      '': '',
      '': '',
    }).map(([give, want]) => {
      expect(deCanonizeDomain(give)).toBe(want)
    })
  })
})
