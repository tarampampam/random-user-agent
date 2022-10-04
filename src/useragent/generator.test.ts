import Generator, {GeneratorType, isValidType} from './generator'

test('isValidType', () => {
  for (const type of Object.keys(GeneratorType)) {
    expect(isValidType(GeneratorType[type])).toBeTruthy()
  }

  expect(isValidType('foo')).toBeFalsy()
})

test('Generator.generate', async () => {
  const gen = new Generator()

  for (const type of Object.keys(GeneratorType)) {
    for (let i = 0; i < 20; i++) {
      const generated = gen.generate([GeneratorType[type]])

      expect(generated.useragent).toMatch(/^Mozilla\/5\.0.+/)

      switch (GeneratorType[type]) {
        case GeneratorType.chromeLinux:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('linux')
          expect(generated.browser).toBe('chrome')

          expect(generated.useragent).toContain('X11')
          expect(generated.useragent).toContain('Linux')
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.chromeMac:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('macOS')
          expect(generated.browser).toBe('chrome')

          expect(generated.useragent).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.chromeWin:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('windows')
          expect(generated.browser).toBe('chrome')

          expect(generated.useragent).toMatch(/Windows NT \d+.\d+/)
          expect(generated.useragent).toContain('64')
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.chromeAndroid:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('android')
          expect(generated.browser).toBe('chrome')

          expect(generated.useragent).toMatch(/Linux; Android \d+/)
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Mobile')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.firefoxLinux:
          expect(generated.engine).toBe('gecko')
          expect(generated.osType).toBe('linux')
          expect(generated.browser).toBe('firefox')

          expect(generated.useragent).toContain('X11')
          expect(generated.useragent).toContain('Linux')
          expect(generated.useragent).toMatch(/Firefox\/\d+\.0/)
          expect(generated.useragent).not.toContain('AppleWebKit')
          expect(generated.useragent).not.toContain('KHTML, like Gecko')
          expect(generated.useragent).not.toContain('Safari\\')
          break

        case GeneratorType.firefoxMac:
          expect(generated.engine).toBe('gecko')
          expect(generated.osType).toBe('macOS')
          expect(generated.browser).toBe('firefox')

          expect(generated.useragent).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated.useragent).toMatch(/Gecko\/\d+/)
          expect(generated.useragent).toMatch(/Firefox\/\d+\.0/)
          expect(generated.useragent).not.toContain('AppleWebKit')
          expect(generated.useragent).not.toContain('Safari\\')
          break

        case GeneratorType.firefoxWin:
          expect(generated.engine).toBe('gecko')
          expect(generated.osType).toBe('windows')
          expect(generated.browser).toBe('firefox')

          expect(generated.useragent).toMatch(/Windows NT \d+.\d+/)
          expect(generated.useragent).toContain('64')
          expect(generated.useragent).toMatch(/Gecko\/\d+/)
          expect(generated.useragent).toMatch(/Firefox\/\d+\.0/)
          break

        case GeneratorType.firefoxAndroid:
          expect(generated.engine).toBe('gecko')
          expect(generated.osType).toBe('android')
          expect(generated.browser).toBe('firefox')

          expect(generated.useragent).toContain('Android')
          expect(generated.useragent).toMatch(/Firefox\/\d+\.0/)
          expect(generated.useragent).toMatch(/Gecko\/\d+\.0/)
          expect(generated.useragent).not.toContain('AppleWebKit')
          expect(generated.useragent).not.toContain('Safari\\')
          break

        case GeneratorType.operaWin:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('windows')
          expect(generated.browser).toBe('opera')

          expect(generated.useragent).toMatch(/Windows NT \d+.\d+/)
          expect(generated.useragent).toContain('64')
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/OPR\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.operaMac:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('macOS')
          expect(generated.browser).toBe('opera')

          expect(generated.useragent).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/OPR\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.safariIphone:
          expect(generated.engine).toBe('webkit')
          expect(generated.osType).toBe('iOS')
          expect(generated.browser).toBe('safari')

          expect(generated.useragent).toMatch(/iPhone; CPU iPhone OS \d+_\d+ like Mac OS X/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toMatch(/Version\/\d+\.\d+/)
          expect(generated.useragent).toMatch(/Mobile\/[A-Z0-9]{6}/)
          expect(generated.useragent).toMatch(/Safari\/\d+\.\d+/)
          break

        case GeneratorType.safariMac:
          expect(generated.engine).toBe('webkit')
          expect(generated.osType).toBe('macOS')
          expect(generated.browser).toBe('safari')

          expect(generated.useragent).toMatch(/Macintosh; Intel Mac OS X \d+_\d+(_\d+|)/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toMatch(/Version\/\d+\.\d+/)
          expect(generated.useragent).not.toContain('Mobile')
          expect(generated.useragent).toMatch(/Safari\/\d+\.\d+/)
          break

        case GeneratorType.edgeWin:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('windows')
          expect(generated.browser).toBe('edge')

          expect(generated.useragent).toMatch(/Windows NT \d+.\d+/)
          expect(generated.useragent).toContain('64')
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/Edg\/\d+\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break

        case GeneratorType.edgeMac:
          expect(generated.engine).toBe('blink')
          expect(generated.osType).toBe('macOS')
          expect(generated.browser).toBe('edge')

          expect(generated.useragent).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated.useragent).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/Edg\/\d+\.\d+\.\d+/)
          expect(generated.useragent).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated.useragent).toContain('KHTML, like Gecko')
          expect(generated.useragent).toContain('Safari/537.36')
          break
      }
    }
  }
})
