import structuredClone from '@ungap/structured-clone'
import { deepFreeze } from '~/shared'
import type { DeepWriteable } from '~/types'
import type { ReadonlyUserAgentState } from '~/shared/types'
import type StorageArea from './storage-area'

type UserAgentState = DeepWriteable<ReadonlyUserAgentState>

export default class {
  private readonly storage: StorageArea<UserAgentState>

  /** A list of change listeners */
  private changeListeners: Array<(newState: ReadonlyUserAgentState) => void> = []

  constructor(storage: StorageArea<UserAgentState>) {
    this.storage = storage
  }

  /** Adds a change listener. */
  onChange(callback: (newState: ReadonlyUserAgentState) => void): void {
    this.changeListeners.push(callback)
  }

  /**
   * Retrieves the current user-agent state.
   *
   * @throws {Error} If the state cannot be loaded.
   */
  async get(): Promise<ReadonlyUserAgentState | undefined> {
    const loaded = await this.storage.get()

    if (loaded) {
      // the previous version of the extension used the info field, but now we save the entire data directly
      // in the root. therefore, we need to migrate the data
      if ('info' in loaded && typeof loaded.info === 'object') {
        // the legacy user-agent state is stored in a different format
        type LegacyUseragentInfo = {
          info?: {
            useragent: string
            engine: 'webkit' | 'blink' | 'gecko' | 'unknown'
            osType: 'windows' | 'linux' | 'macOS' | 'iOS' | 'android' | 'unknown'
            browser: 'chrome' | 'firefox' | 'opera' | 'safari' | 'edge' | 'unknown'
            browserVersion: { major: number; full: string }
            brandBrowserVersion?: { major: number; full: string }
          }
        }

        const legacy = loaded as LegacyUseragentInfo

        return deepFreeze({
          userAgent: legacy.info?.useragent || '',
          browser: legacy.info?.browser || 'unknown',
          os: legacy.info?.osType || 'unknown',
          version: {
            browser: legacy.info?.brandBrowserVersion || { major: 0, full: '0.0.0' },
            underHood: legacy.info?.browserVersion || undefined,
          },
        })
      }

      return deepFreeze(loaded)
    }
  }

  /**
   * Update the current user-agent state. Listeners are notified about the changes.
   *
   * @throws {Error} If the state cannot be updated.
   */
  async update(updated: UserAgentState): Promise<ReadonlyUserAgentState> {
    const current = await this.storage.get()

    if (JSON.stringify(current) !== JSON.stringify(updated)) {
      await this.storage.set(updated)

      const clone = deepFreeze(structuredClone(updated))

      this.changeListeners.forEach((listener) => queueMicrotask(() => listener(clone)))

      return clone
    }

    return deepFreeze(structuredClone(updated))
  }
}
