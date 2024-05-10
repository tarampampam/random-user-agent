import {Storage} from './storage'
import Settings, {SettingEvent} from './settings'

describe('Settings working', (): void => {
  class StorageMock implements Storage {
    private data = {}

    async init(): Promise<void> {
      //
    }

    async set(key: string, value: { [p: string]: any }): Promise<void> {
      this.data[key] = value
    }

    async get(key: string): Promise<{ [p: string]: any }> {
      if (!this.data.hasOwnProperty(key)) {
        return {}
      }

      return this.data[key]
    }

    async clear(): Promise<void> {
      this.data = {}
    }
  }

  test('Event emitting', async () => {
    const settings = new Settings(new StorageMock)

    const emittedCounts = {
      [SettingEvent.onLoad]: 0,
      [SettingEvent.onSave]: 0,
      [SettingEvent.onChange]: 0,
    }

    settings.on(SettingEvent.onLoad, () => emittedCounts[SettingEvent.onLoad]++)
    settings.on(SettingEvent.onSave, () => emittedCounts[SettingEvent.onSave]++)
    settings.on(SettingEvent.onChange, () => emittedCounts[SettingEvent.onChange]++)

    await settings.load()

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(0)
    expect(emittedCounts[SettingEvent.onChange]).toBe(0)

    await settings.save()
    await settings.save()

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(2)
    expect(emittedCounts[SettingEvent.onChange]).toBe(0)

    settings.update({enabled: false})

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(2)
    expect(emittedCounts[SettingEvent.onChange]).toBe(1)

    settings.update({enabled: undefined, generator: {types: undefined}}) // onChange should be not emitted with undefined

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(2)
    expect(emittedCounts[SettingEvent.onChange]).toBe(1)

    settings.update({blacklist: {domains: ['foo']}})

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(2)
    expect(emittedCounts[SettingEvent.onChange]).toBe(2)

    settings.update({blacklist: {domains: ['bar']}})

    expect(emittedCounts[SettingEvent.onLoad]).toBe(1)
    expect(emittedCounts[SettingEvent.onSave]).toBe(2)
    expect(emittedCounts[SettingEvent.onChange]).toBe(3)
  })

  test('Update root boolean property', (): void => {
    const settings = new Settings(new StorageMock)

    settings.update({enabled: true})

    expect(settings.get().enabled).toBeTruthy()

    settings.update({enabled: undefined})

    expect(settings.get().enabled).toBeTruthy()

    settings.update({enabled: false})

    expect(settings.get().enabled).toBeFalsy()

    settings.update({enabled: undefined})

    expect(settings.get().enabled).toBeFalsy()
  })

  test('Update nested property', (): void => {
    const settings = new Settings(new StorageMock)

    settings.update({blacklist: {domains: ['foo']}, renew: {intervalMillis: 100}})

    expect(settings.get().blacklist.domains).toEqual(['foo'])
    expect(settings.get().renew.intervalMillis).toEqual(100)

    settings.update({blacklist: {domains: undefined}, renew: {intervalMillis: undefined}})

    expect(settings.get().blacklist.domains).toEqual(['foo'])
    expect(settings.get().renew.intervalMillis).toEqual(100)

    settings.update({blacklist: {domains: ['bar', 'baz']}, renew: {intervalMillis: 666}})

    expect(settings.get().blacklist.domains).toEqual(['bar', 'baz'])
    expect(settings.get().renew.intervalMillis).toEqual(666)
  })
})
