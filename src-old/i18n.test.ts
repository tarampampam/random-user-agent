import path from 'path'
import fs from 'fs'

const pathToLocales = path.join(__dirname, '..', 'public', '_locales'),
  mainLocale = 'en',
  locales: string[] = []

describe('localizations', (): void => {
  test('locales directory exists', (): void => {
    expect(fs.existsSync(pathToLocales)).toBeTruthy()
  })

  locales.push(
    ...fs.readdirSync(pathToLocales)
      .filter(f => f !== mainLocale)
      .filter(f => fs.lstatSync(path.join(pathToLocales, f)).isDirectory()),
  )

  test('locales count', (): void => {
    expect(locales.length).toBeGreaterThanOrEqual(2)
  })

  const mainLocaleContent: Record<string, any> = JSON.parse(
    fs.readFileSync(
      path.join(pathToLocales, mainLocale, 'messages.json'),
    ).toString(),
  )

  const mainLocaleKeys = Object.keys(mainLocaleContent)

  test('main file format', (): void => {
    expect(mainLocaleKeys.length).toBeGreaterThanOrEqual(40)

    for (const [key, value] of Object.entries(mainLocaleContent)) {
      const message = value['message']

      expect(typeof message).toBe('string')
      expect(message.length).toBeGreaterThanOrEqual(1)
    }
  })

  locales.forEach(locale => {
    const content: Record<string, any> = JSON.parse(
      fs.readFileSync(
        path.join(pathToLocales, locale, 'messages.json'),
      ).toString(),
    )

    const keys = Object.keys(content)

    mainLocaleKeys.forEach(key => {
      test(`locale ${locale}, key ${key}`, (): void => {
        expect(typeof content[key]).toBe('object')
        expect(typeof content[key]['message']).toBe('string')
      })
    })

    expect(mainLocaleKeys.length).toEqual(keys.length)
  })
})
