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

      expect(generated).toMatch(/^Mozilla\/5\.0.+/)

      switch (GeneratorType[type]) {
        case GeneratorType.chromeLinux:
          expect(generated).toContain('X11')
          expect(generated).toContain('Linux')
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.chromeMac:
          expect(generated).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.chromeWin:
          expect(generated).toMatch(/Windows NT \d+.\d+/)
          expect(generated).toContain('64')
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.chromeAndroid:
          expect(generated).toMatch(/Linux; Android \d+/)
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Mobile')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.firefoxLinux:
          expect(generated).toContain('X11')
          expect(generated).toContain('Linux')
          expect(generated).toMatch(/Firefox\/\d+\.0/)
          expect(generated).not.toContain('AppleWebKit')
          expect(generated).not.toContain('KHTML, like Gecko')
          expect(generated).not.toContain('Safari\\')
          break

        case GeneratorType.firefoxMac:
          expect(generated).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated).toMatch(/Gecko\/\d+/)
          expect(generated).toMatch(/Firefox\/\d+\.0/)
          expect(generated).not.toContain('AppleWebKit')
          expect(generated).not.toContain('Safari\\')
          break

        case GeneratorType.firefoxWin:
          expect(generated).toMatch(/Windows NT \d+.\d+/)
          expect(generated).toContain('64')
          expect(generated).toMatch(/Gecko\/\d+/)
          expect(generated).toMatch(/Firefox\/\d+\.0/)
          break

        case GeneratorType.firefoxAndroid:
          expect(generated).toContain('Android')
          expect(generated).toMatch(/Firefox\/\d+\.0/)
          expect(generated).toMatch(/Gecko\/\d+\.0/)
          expect(generated).not.toContain('AppleWebKit')
          expect(generated).not.toContain('Safari\\')
          break

        case GeneratorType.operaWin:
          expect(generated).toMatch(/Windows NT \d+.\d+/)
          expect(generated).toContain('64')
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/OPR\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.operaMac:
          expect(generated).toMatch(/Macintosh; Intel Mac OS X \d+_\d+/)
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/OPR\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break

        case GeneratorType.safariIphone:
          expect(generated).toMatch(/iPhone; CPU iPhone OS \d+_\d+ like Mac OS X/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toMatch(/Version\/\d+\.\d+/)
          expect(generated).toMatch(/Mobile\/[A-Z0-9]{6}/)
          expect(generated).toMatch(/Safari\/\d+\.\d+/)
          break

        case GeneratorType.safariMac:
          expect(generated).toMatch(/Macintosh; Intel Mac OS X \d+_\d+(_\d+|)/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toMatch(/Version\/\d+\.\d+/)
          expect(generated).not.toContain('Mobile')
          expect(generated).toMatch(/Safari\/\d+\.\d+/)
          break

        case GeneratorType.edgeWin:
          expect(generated).toMatch(/Windows NT \d+.\d+/)
          expect(generated).toContain('64')
          expect(generated).toMatch(/Chrome\/\d+\.0\.\d+\.\d+/)
          expect(generated).toMatch(/Edg\/\d+\.\d+\.\d+/)
          expect(generated).toMatch(/AppleWebKit\/\d+\.\d+/)
          expect(generated).toContain('KHTML, like Gecko')
          expect(generated).toContain('Safari/537.36')
          break
      }
    }
  }
})
