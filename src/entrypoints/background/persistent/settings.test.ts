import { describe, expect, test } from 'vitest'
import type { SettingsState } from '../../../shared/types/settings'
import Settings from './settings'
import StorageArea from './storage-area'

describe('settings', () => {
  // this is mock of the browser's storage area that does nothing
  class StorageAreaMock extends StorageArea {
    private state?: Record<string, unknown>

    async clear(): Promise<void> {
      this.state = undefined
    }

    async set<T>(v: T): Promise<void> {
      this.state = JSON.parse(JSON.stringify(v)) as Record<string, unknown>
    }

    async get<T>(): Promise<T | undefined> {
      return this.state as T | undefined
    }
  }

  test('update root boolean property', async () => {
    const settings = new Settings(new StorageAreaMock('some-key', 'local'))

    await settings.update({ enabled: true })
    expect((await settings.get()).enabled).toBeTruthy()

    await settings.update({ enabled: undefined })
    expect((await settings.get()).enabled).toBeTruthy()

    await settings.update({ enabled: false })
    expect((await settings.get()).enabled).toBeFalsy()

    await settings.update({ enabled: undefined })
    expect((await settings.get()).enabled).toBeFalsy()
  })

  test('update nested property', async () => {
    const settings = new Settings(new StorageAreaMock('some-key', 'local'))

    await settings.update({ blacklist: { domains: ['foo'] }, renew: { intervalMillis: 30001 } })
    expect((await settings.get()).blacklist.domains).toEqual(['foo'])
    expect((await settings.get()).renew.intervalMillis).toEqual(30001)

    await settings.update({ blacklist: { domains: undefined }, renew: { intervalMillis: undefined } })
    expect((await settings.get()).blacklist.domains).toEqual(['foo'])
    expect((await settings.get()).renew.intervalMillis).toEqual(30001)

    await settings.update({ blacklist: { domains: ['bar', 'baz'] }, renew: { intervalMillis: 666 } })
    expect((await settings.get()).blacklist.domains).toEqual(['bar', 'baz'])
    expect((await settings.get()).renew.intervalMillis).toEqual(30000)
  })

  test('partial from storage', async () => {
    const area: StorageArea<SettingsState> = new StorageAreaMock('some-key', 'local')
    const settings = new Settings(area)

    await settings.update({ enabled: false, remoteUseragentList: { uri: 'foo' } }) // force to save

    // read the current state and remove some key
    {
      const current = await area.get()
      if (!current) {
        throw new Error('current is undefined')
      }

      // @ts-expect-error - emulate partial data!
      delete current.stats

      await area.set(current)
    }

    let executed = false

    settings.onChange((s) => {
      expect(s.stats).not.toBeUndefined()
      expect(s.remoteUseragentList.uri).toEqual('foo')
      expect(s.enabled).toBeTruthy()

      executed = true
    })

    await settings.update({ enabled: true }) // force to save

    expect(executed).toBeTruthy()
  })

  test('onChange listener', async () => {
    const settings = new Settings(new StorageAreaMock('some-key', 'local'))
    let execCount = 0

    settings.onChange(() => {
      execCount++
    })

    const defaults = await settings.get()
    await settings.update({})
    expect(execCount).toBe(0)

    await settings.update({ enabled: defaults.enabled })
    expect(execCount).toBe(0)

    await settings.update({ enabled: !defaults.enabled })
    expect(execCount).toBe(1)

    await settings.update({ enabled: undefined, generator: { types: undefined } })
    expect(execCount).toBe(1) // not changed

    await settings.update({ blacklist: { domains: ['foo'] } })
    expect(execCount).toBe(2)

    await settings.update({ blacklist: { domains: ['bar'] } })
    expect(execCount).toBe(3)
  })
})
