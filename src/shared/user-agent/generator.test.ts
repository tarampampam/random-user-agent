import { describe, expect, test } from 'vitest'
import generate from './generator'

describe('generate', () => {
  const generalUserAgentRe = /^Mozilla\/5\.0 /

  for (let i = 1; i <= 30; i++) {
    describe('chrome_linux', () => {
      test('auto', () => {
        const result = generate('chrome_linux')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('X11')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/')
      })

      test('specific', () => {
        const result = generate('chrome_linux', { version: '90.0.4430.93' })

        expect(result.version.browser.full).toBe('90.0.4430.93')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('X11')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93')
      })
    })

    describe('chrome_mac', () => {
      test('auto', () => {
        const result = generate('chrome_mac')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/')
      })

      test('specific', () => {
        const result = generate('chrome_mac', { version: '90.0.4430' })

        expect(result.version.browser.full).toBe('90.0.4430')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430')
      })
    })

    describe('chrome_win', () => {
      test('auto', () => {
        const result = generate('chrome_win')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/')
      })

      test('specific', () => {
        const result = generate('chrome_win', { version: '90.0' })

        expect(result.version.browser.full).toBe('90.0')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0')
      })
    })

    describe('chrome_android', () => {
      test('auto', () => {
        const result = generate('chrome_android')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Android')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/')
      })

      test('specific', () => {
        const result = generate('chrome_android', { version: '90', mobileVendor: 'Samsung' })

        expect(result.version.browser.full).toBe('90')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Android')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('Samsung')
        expect(result.userAgent).contains('AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90')
      })
    })

    describe('firefox_linux', () => {
      test('auto', () => {
        const result = generate('firefox_linux')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('X11')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/')
      })

      test('specific', () => {
        const result = generate('firefox_linux', { version: '0.1.2.3ecr' })

        expect(result.version.browser.full).toBe('0.1.2.3ecr')
        expect(result.version.browser.major).toBe(0)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('X11')
        expect(result.userAgent).contains('Linux')
        expect(result.userAgent).contains('Firefox/0.1.2.3ecr')
      })
    })

    describe('firefox_mac', () => {
      test('auto', () => {
        const result = generate('firefox_mac')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/')
      })

      test('specific', () => {
        const result = generate('firefox_mac', { version: 'ecr' })

        expect(result.version.browser.full).toBe('ecr')
        expect(result.version.browser.major).toBeNaN()
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Firefox/ecr')
      })
    })

    describe('firefox_win', () => {
      test('auto', () => {
        const result = generate('firefox_win')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('x64')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/')
      })

      test('specific', () => {
        const result = generate('firefox_win', { version: '' })

        expect(result.version.browser.full).not.equal('')
        expect(result.version.browser.major).not.toBeNaN()
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('x64')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/')
      })
    })

    describe('firefox_android', () => {
      test('auto', () => {
        const result = generate('firefox_android')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Android')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/')
      })

      test('specific', () => {
        const result = generate('firefox_android', { version: '1.2.3', mobileVendor: 'Samsung' })

        expect(result.version.browser.full).toBe('1.2.3')
        expect(result.version.browser.major).toBe(1)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Android')
        expect(result.userAgent).contains('Samsung')
        expect(result.userAgent).contains('Gecko/')
        expect(result.userAgent).contains('Firefox/1.2.3')
      })
    })

    describe('safari_iphone', () => {
      test('auto', () => {
        const result = generate('safari_iphone')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('iPhone')
        expect(result.userAgent).contains('Safari/')
        expect(result.userAgent).contains('Mobile/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('safari_iphone', { version: '1.2.3' })

        expect(result.version.browser.full).toBe('1.2.3')
        expect(result.version.browser.major).toBe(1)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('iPhone')
        expect(result.userAgent).contains('Safari/')
        expect(result.userAgent).contains('Mobile/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    describe('safari_mac', () => {
      test('auto', () => {
        const result = generate('safari_mac')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Safari/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('safari_mac', { version: '1.2.3' })

        expect(result.version.browser.full).toBe('1.2.3')
        expect(result.version.browser.major).toBe(1)
        expect(result.version.underHood).toBeUndefined()
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Safari/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    describe('opera_win', () => {
      test('auto', () => {
        const result = generate('opera_win')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('OPR/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('opera_win', { version: '90.0' })

        expect(result.version.browser.full).toBe('90.0')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood?.type).toBe('chrome')
        expect(result.version.underHood?.full).not.toBe('')
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('OPR/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    describe('opera_mac', () => {
      test('auto', () => {
        const result = generate('opera_mac')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('OPR/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('opera_mac', { version: '90.0' })

        expect(result.version.browser.full).toBe('90.0')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood?.type).toBe('chrome')
        expect(result.version.underHood?.full).not.toBe('')
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('OPR/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    describe('edge_win', () => {
      test('auto', () => {
        const result = generate('edge_win')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('Edg/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('edge_win', { version: '90.0' })

        expect(result.version.browser.full).toBe('90.0')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood?.type).toBe('chrome')
        expect(result.version.underHood?.full).not.toBe('')
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Windows NT')
        expect(result.userAgent).contains('64')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('Edg/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    describe('edge_mac', () => {
      test('auto', () => {
        const result = generate('edge_mac')

        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('Edg/')
        expect(result.userAgent).contains('AppleWebKit/')
      })

      test('specific', () => {
        const result = generate('edge_mac', { version: '90.0' })

        expect(result.version.browser.full).toBe('90.0')
        expect(result.version.browser.major).toBe(90)
        expect(result.version.underHood?.type).toBe('chrome')
        expect(result.version.underHood?.full).not.toBe('')
        expect(result.userAgent).toMatch(generalUserAgentRe)
        expect(result.userAgent).contains('Macintosh')
        expect(result.userAgent).contains('Intel Mac OS X')
        expect(result.userAgent).contains('Chrome/')
        expect(result.userAgent).contains('Edg/')
        expect(result.userAgent).contains('AppleWebKit/')
      })
    })

    test('unsupported', () => {
      // @ts-expect-error Testing unsupported user agent
      expect(() => generate('foobar')).toThrow('Unsupported generator type: foobar')
    })
  }
})
