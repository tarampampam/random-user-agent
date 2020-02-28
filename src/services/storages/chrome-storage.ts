/**
 * This storage implementation uses `chrome.storage.(sync|local)` storage's.
 *
 * Requires Chrome 34 and above.
 *
 * @link <https://developer.chrome.com/extensions/storage>
 * @link <https://developer.chrome.com/extensions/runtime#property-lastError>
 */
export default class ChromeStorage implements Services.Storage {
  // Use synchronized storage, if it is possible
  private readonly preferSyncStorage: boolean;

  /**
   * Creates new chrome storage instance.
   */
  constructor(preferSyncStorage: boolean) {
    this.preferSyncStorage = preferSyncStorage;
  }

  clear(): Promise<void> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local;

    return new Promise((resolve: Function, reject: Function): void => {
      // execute `clear` method for `*.local` or `*.sync` storage
      storage.clear(() => {
        let error = chrome.runtime.lastError;

        // if some error happened
        if (error) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(error.message));

            return;
          }

          // repeat `clear()` action with `*.local` storage
          chrome.storage.local.clear((): void => {
            let error = chrome.runtime.lastError;

            // check for error again
            if (error) {
              // and if any error happened - call `reject` action
              reject(new Error(error.message));

              return;
            }

            resolve();
          });
        }

        resolve();
      });
    });
  }

  get(key: string): Promise<{ [p: string]: any }> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local;

    return new Promise((resolve: Function, reject: Function) => {
      storage.get(key, (items): void => {
        let error = chrome.runtime.lastError;

        // if some error happened
        if (error) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(error.message));

            return;
          }

          // try to repeat this action with `*.local` storage
          chrome.storage.local.get((items) => {
            let error = chrome.runtime.lastError;

            // check for error again
            if (error) {
              // and if any error happened - call `reject` action
              reject(new Error(error.message));

              return;
            }

            if (!items.hasOwnProperty(key)) {
              reject(new Error('Local storage does not contains expected data'));

              return;
            }

            resolve(items[key]);
          });
        }

        if (!items.hasOwnProperty(key)) {
          reject(new Error('Storage does not contains expected data'));

          return;
        }

        resolve(items[key]);
      });
    });
  }

  set(key: string, value: { [p: string]: any }): Promise<void> {
    const storage = this.preferSyncStorage
      ? chrome.storage.sync
      : chrome.storage.local;

    const data = {[key]: value};

    return new Promise((resolve: Function, reject: Function) => {
      storage.set(data, () => {
        let error = chrome.runtime.lastError;

        // if some error happened
        if (error) {
          // `*.local` storage is used - in this case we have no fallback
          if (!this.preferSyncStorage) {
            reject(new Error(error.message));

            return;
          }

          // try to repeat this action with `*.local` storage
          chrome.storage.local.set(data, () => {
            let error = chrome.runtime.lastError;

            // check for error again
            if (error) {
              // and if any error happened - call `reject` action
              reject(new Error(error.message));

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
