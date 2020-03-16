import {Services} from "@/services/services";

/**
 * This storage implementation uses `chrome.storage.(sync|local)` storage's.
 *
 * If "prefer sync storage" is set to `true`, and while working with `chrome.storage.sync` storage error happened - as
 * fallback will be used `chrome.storage.local` storage.
 *
 * @link <https://github.com/tarampampam/random-user-agent/issues/56>
 *
 * Requires Chrome 34 and above.
 *
 * @link <https://developer.chrome.com/extensions/storage>
 * @link <https://developer.chrome.com/extensions/runtime#property-lastError>
 */
export default class ChromeStorage implements Services.Storage {
  // Use synchronized storage, if it is possible
  private preferSyncStorage: boolean;

  /**
   * Creates new chrome storage instance.
   */
  public constructor(preferSyncStorage: boolean) {
    this.preferSyncStorage = preferSyncStorage;
  }

  /**
   * Change "synchronized storage is preferred" state.
   */
  public setPreferSyncStorage(prefer: boolean): void {
    this.preferSyncStorage = prefer;
  }

  /**
   * @inheritDoc
   */
  public clear(): Promise<void> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local;

    return new Promise((resolve: () => void, reject: (_: Error) => void): void => {
      // execute `clear` method for `*.local` or `*.sync` storage
      storage.clear((): void => {
        let storageError = chrome.runtime.lastError;

        // if some error happened
        if (storageError) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(storageError.message));

            return;
          }

          // repeat `clear()` action with `*.local` storage
          chrome.storage.local.clear((): void => {
            let localStorageError = chrome.runtime.lastError;

            // check for error again
            if (localStorageError) {
              // and if any error happened - call `reject` action
              reject(new Error(localStorageError.message));

              return;
            }

            resolve();
          });
        }

        resolve();
      });
    });
  }

  /**
   * @inheritDoc
   */
  public get(key: string): Promise<{ [key: string]: any }> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local; // @todo refactor

    return new Promise((resolve: ({}: { [key: string]: any }) => void, reject: (_: Error) => void): void => {
      storage.get(key, (items): void => {
        const error = chrome.runtime.lastError;

        // if some error happened
        if (error) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(error.message));

            return;
          }

          // try to repeat this action with `*.local` storage
          chrome.storage.local.get(key, (items) => {
            const localError = chrome.runtime.lastError;

            // check for error again
            if (localError) {
              // and if any error happened - call `reject` action
              reject(new Error(localError.message));

              return;
            }

            if (!items[key]) {
              reject(new Error('Local storage does not contains expected data'));

              return;
            }

            resolve(items[key]);
          });
        }

        if (!items[key]) {
          reject(new Error('Storage does not contains expected data'));

          return;
        }

        resolve(items[key]);
      });
    });
  }

  /**
   * @inheritDoc
   */
  public set(key: string, value: { [key: string]: any }): Promise<void> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local;

    const data = {[key]: value};

    return new Promise((resolve: () => void, reject: (_: Error) => void): void => {
      storage.set(data, (): void => {
        const error = chrome.runtime.lastError;

        // if some error happened
        if (error) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(error.message));

            return;
          }

          // try to repeat this action with `*.local` storage
          chrome.storage.local.set(data, (): void => {
            const localError = chrome.runtime.lastError;

            // check for error again
            if (localError) {
              // and if any error happened - call `reject` action
              reject(new Error(localError.message));

              return;
            }

            resolve();
          });
        }

        resolve();
      });
    });
  }
}
