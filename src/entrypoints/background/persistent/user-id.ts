import structuredClone from '@ungap/structured-clone'
import type { DeepReadonly } from '~/types'
import type StorageArea from './storage-area'

type UserIDState = {
  userID: string
}

export default class {
  private readonly storage: StorageArea<UserIDState>
  private state?: UserIDState // cache

  constructor(storage: StorageArea<UserIDState>) {
    this.storage = storage
  }

  /**
   * Retrieves the user ID state, or generates a new one if it doesn't exist.
   *
   * @throws {Error} If the state cannot be loaded or saved.
   */
  async get(): Promise<DeepReadonly<UserIDState>> {
    // if we have the state in the cache, return it
    if (this.state) {
      return structuredClone(this.state)
    }

    // otherwise, load it from the storage
    this.state = await this.storage.get()

    // if we still don't have the state, generate a new one
    if (!this.state) {
      this.state = { userID: crypto.randomUUID() }

      await this.storage.set(this.state)
    }

    return structuredClone(this.state)
  }
}
