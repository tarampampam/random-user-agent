import { describe, expect, test } from 'vitest'
import { canonizeDomain, deCanonizeDomain, validateDomainOrIP } from './domains'

describe('domains', () => {
  test('canonize', () => {
    Object.entries({
      ' https://  www.g00gle.COM/foo?bar=baz&_=123#href': 'www.g00gle.com',
      'http ://google....c/': 'google.c',
      'www.google.com': 'www.google.com',
      '127.0.0.1': '127.0.0.1',
      '10.0.0.1.nip.io': '10.0.0.1.nip.io',
      '2001:db8:3333:4444:5555:6666:7777:8888': '2001:db8:3333:4444:5555:6666:7777:8888',
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

  describe('validateDomainOrIP', () => {
    test('valid', () => {
      for (const domain of [
        'google.com',
        'www.whatismybrowser.com',
        'xn--j1ail.xn--p1ai',
        'xn--c1yn36f',
        'bar.foo.example.com',
        'bar.foo.example',
        'exa-mple.co.uk',
        'foo.com',
        '10.0.0.1.nip.io',
        'finance101.com',
        '365response.org',
        'sci-fi.com',
        'co.business',
        'abc.d',
        'a.b',
        'a',
        'foo',
        '127.0.0.1',
        '115.42.150.37',
        '192.168.0.1',
        '110.234.52.124',
        '33.3333.33.3.com',
        'localhost',
        '2001:db8:3333:4444:5555:6666:7777:8888',
        '2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF',
      ]) {
        expect(validateDomainOrIP(domain), domain).toBe(true)
      }
    })

    test('invalid', () => {
      for (const domain of [
        'foo.',
        'foo$',
        'foo#',
        'foo!',
        '!foo',
        '! foo',
        '.a',
        'a.',
        'foo:',
        'foo..com',
        '.foo.com',
        'foo.com.',
        'foo..bar.com',
        'foo.bar.',
        'foo..',
        '.',
        'xn--j1ail.xn--p1ai ',
        '\txn--c1yn36f',
        '',
        'google.com/foo',
        'google.com:80',
        'google.com:443',
        '127.0.0.256',
        '127.0.0.',
        '210.110',
        '210.111 ',
        ' 211.110',
        '255',
        '666.10.10.20',
        '33.3333.33.3',
        '2001:db8:3333:4444:5555:6666:7777:8888:9999::',
      ]) {
        expect(validateDomainOrIP(domain), domain).toBe(false)
      }
    })
  })
})
