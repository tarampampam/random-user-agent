import structuredClone from '@ungap/structured-clone'
import { deepFreeze } from '~/shared'
import type { PartialSettingsState, ReadonlySettingsState } from '~/shared/types'
import { type DeepPartial, type DeepWriteable } from '~/types'
import type StorageArea from './storage-area'

type SettingsState = DeepWriteable<ReadonlySettingsState>

/** Extension settings */
export default class {
  private readonly storage: StorageArea<SettingsState>

  /** Initial (default) extension settings */
  private readonly defaults: SettingsState = {
    enabled: true,
    renew: {
      enabled: true,
      intervalMillis: 10 * 60 * 1000, // once in 10 minutes
      onStartup: true,
    },
    customUseragent: {
      enabled: false,
      list: [],
    },
    remoteUseragentList: {
      enabled: false,
      uri: '',
      updateIntervalMillis: 60 * 60 * 1000, // hourly
    },
    jsProtection: {
      enabled: true,
    },
    generator: {
      types: ['chrome_win', 'chrome_linux', 'chrome_mac'],
      syncOsWithHost: false,
    },
    blacklist: {
      mode: 'blacklist',
      domains: ['localhost', '127.0.0.1'],
    },
    stats: {
      enabled: true,
    },
  }

  /** A list of change listeners */
  private changeListeners: Array<(newState: ReadonlySettingsState) => void> = []

  constructor(storage: StorageArea<SettingsState>, browserName?: 'chrome' | 'firefox' | 'opera' | 'edge') {
    this.storage = storage

    switch (browserName) {
      case 'firefox':
        this.defaults.generator.types = ['firefox_win', 'firefox_linux', 'firefox_mac']
        break

      case 'opera':
        this.defaults.generator.types = ['opera_win', 'opera_mac']
        break

      case 'edge':
        this.defaults.generator.types = ['edge_win', 'edge_mac']
        break
    }
  }

  /** Adds a change listener. */
  onChange(callback: (newState: ReadonlySettingsState) => void): void {
    this.changeListeners.push(callback)
  }

  /**
   * Retrieves the current settings.
   *
   * @throws {Error} If the settings cannot be loaded.
   */
  async get(): Promise<ReadonlySettingsState> {
    const loaded = await this.storage.get()

    if (loaded) {
      const [merged] = this.merge(structuredClone(this.defaults), loaded)

      // 'custom' is deprecated and should be removed
      if (merged.blacklist && 'custom' in merged.blacklist) {
        delete merged.blacklist.custom
      }

      // the minimum interval for auto-renewal is 30 seconds (depends on alarms API)
      merged.renew.intervalMillis = Math.max(30 * 1000, merged.renew.intervalMillis)

      return deepFreeze(merged)
    }

    return deepFreeze(structuredClone(this.defaults))
  }

  /**
   * Updates the settings. The changes are merged with the current settings. Listeners are notified about the
   * changes only if there are any.
   *
   * @throws {Error} If the settings cannot be saved.
   */
  async update(updated: PartialSettingsState): Promise<ReadonlySettingsState> {
    // 'custom' is deprecated and should be removed
    if (updated.blacklist && 'custom' in updated.blacklist) {
      delete updated.blacklist.custom
    }

    const current = await this.storage.get()
    const [merged, changes] = this.merge(structuredClone(current ?? this.defaults), updated)

    if (changes > 0) {
      // to clean in the storage
      if ('custom' in merged.blacklist) {
        delete merged.blacklist.custom
      }

      await this.storage.set(merged)

      const clone = deepFreeze(structuredClone(merged))

      this.changeListeners.forEach((listener) => queueMicrotask(() => listener(clone)))
    }

    return deepFreeze(merged)
  }

  /** Merge two settings states and return the merged state and the number of changes. */
  private merge<T extends SettingsState>(current: T, updated: DeepPartial<T>): [T, number] {
    let changes = 0

    for (const [key, value] of Object.entries(updated) as [keyof T, T[keyof T]][]) {
      if (value === undefined) {
        continue
      }

      if (!(key in current)) {
        continue
      }

      const currentValue = current[key]

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof currentValue === 'object' &&
        currentValue !== null &&
        !Array.isArray(currentValue)
      ) {
        const [newState, changedCount] = this.merge(currentValue as T, value)

        current[key] = newState as T[keyof T]
        changes += changedCount
      } else if (Array.isArray(value) && Array.isArray(currentValue)) {
        if (!this.arraysEqual(value, currentValue)) {
          current[key] = value
          changes++
        }
      } else if (currentValue !== value) {
        current[key] = value
        changes++
      }
    }

    return [current, changes]
  }

  /** Compares two arrays. The order of elements is not important. */
  private arraysEqual<T extends Array<unknown>>(arr1: T, arr2: T): boolean {
    if (arr1.length !== arr2.length) {
      return false
    }

    const [sorted1, sorted2] = [structuredClone(arr1).sort(), structuredClone(arr2).sort()]

    for (let i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) {
        return false
      }
    }

    return true
  }
}
