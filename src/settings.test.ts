import Settings, {GeneratorType} from "@/settings";
import ChromeStorage from "@/services/storages/chrome-storage";

/**
 * Generates random string.
 */
const generateRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

describe('settings', () => {
  const defaultStorageMock = new class implements Services.Storage {
    clear(): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }

    get(key: string): Promise<{ [key: string]: any }> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }

    set(key: string, value: { [key: string]: any }): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }
  };

  const defaultSettings = new Settings(defaultStorageMock);

  it('has correct storage key', (): void => {
    expect(defaultSettings.getStorageKey()).toEqual('extension_settings_v2');
  });

  it('getters and setters works together', (): void => {
    [true, false].forEach((value: boolean) => {
      defaultSettings.setEnabled(value);
      expect(defaultSettings.isEnabled()).toEqual(value);

      defaultSettings.setRenewalEnabled(value);
      expect(defaultSettings.isRenewalEnabled()).toEqual(value);

      defaultSettings.setRenewalOnStartupEnabled(value);
      expect(defaultSettings.isRenewalOnStartupEnabled()).toEqual(value);

      defaultSettings.setSynchronizationEnabled(value);
      expect(defaultSettings.isSynchronizationEnabled()).toEqual(value);

      defaultSettings.setCustomUserAgentEnabled(value);
      expect(defaultSettings.isCustomUserAgentEnabled()).toEqual(value);

      defaultSettings.setJavascriptProtectionEnabled(value);
      expect(defaultSettings.isJavascriptProtectionEnabled()).toEqual(value);
    });

    [generateRandomString(), null].forEach((value: string | null) => {
      defaultSettings.setUserAgent(value);
      expect(defaultSettings.getUserAgent()).toEqual(value);

      defaultSettings.setCustomUserAgent(value);
      expect(defaultSettings.getCustomUserAgent()).toEqual(value);
    });

    [Math.random()].forEach((value: number) => {
      defaultSettings.setRenewalIntervalMs(value);
      expect(defaultSettings.getRenewalIntervalMs()).toEqual(value);
    });

    [[generateRandomString()], [generateRandomString(), generateRandomString()], []].forEach((value: string[]) => {
      defaultSettings.setCustomUserAgentsList(value);
      expect(defaultSettings.getCustomUserAgentsList()).toEqual(value);

      defaultSettings.setExceptionsList(value);
      expect(defaultSettings.getExceptionsList()).toEqual(value);
    });

    [['chrome_win'], ['chrome_mac', 'chrome_linux'], ['firefox_win', 'firefox_mac', 'firefox_linux']].forEach((value: string[]) => {
      defaultSettings.setGeneratorTypes(value as GeneratorType[]);
      expect(defaultSettings.getGeneratorTypes()).toEqual(value);
    });

    expect(defaultSettings.getBugReportLink()).toMatch(/^https?:\/\//);
    expect(defaultSettings.getDonationLink()).toMatch(/^https?:\/\//);
  });

  it('can load settings from storage', (): Promise<void> => {
    expect.assertions(15);

    const storedSettings = {
      enabled: true,
      useragent: generateRandomString(),
      renew_enabled: true,
      renew_interval: 1234567,
      renew_onstartup: true,
      sync: true,
      custom_useragent_enabled: false,
      custom_useragent_value: generateRandomString(),
      custom_useragent_list: [generateRandomString(), generateRandomString()],
      javascript_protection_enabled: true,
      generator_types: ['firefox_mac', 'firefox_linux'],
      exceptions_list: [generateRandomString()],
    };

    const storageMock = new class implements Services.Storage {
      clear(): Promise<void> {
        return new Promise((): void => {
          // do nothing
        });
      }

      get(key: string): Promise<{ [key: string]: any }> {
        return new Promise((resolve: Function, reject: Function): void => {
          expect(key).toEqual('extension_settings_v2');

          resolve(storedSettings);
        });
      }

      set(key: string, value: { [key: string]: any }): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }
    };

    const settings = new Settings(storageMock);

    expect(settings.getUserAgent()).not.toEqual(storedSettings.useragent);
    expect(settings.getRenewalIntervalMs()).not.toEqual(storedSettings.renew_interval);
    expect(settings.getCustomUserAgent()).not.toEqual(storedSettings.custom_useragent_value);
    expect(settings.getCustomUserAgentsList()).not.toEqual(storedSettings.custom_useragent_list);
    expect(settings.getGeneratorTypes()).not.toEqual(storedSettings.generator_types);
    expect(settings.getExceptionsList()).not.toEqual(storedSettings.exceptions_list);
    expect(settings.isLoaded()).toEqual(false);

    return settings.load()
      .then(() => {
        expect(settings.getUserAgent()).toEqual(storedSettings.useragent);
        expect(settings.getRenewalIntervalMs()).toEqual(storedSettings.renew_interval);
        expect(settings.getCustomUserAgent()).toEqual(storedSettings.custom_useragent_value);
        expect(settings.getCustomUserAgentsList()).toEqual(storedSettings.custom_useragent_list);
        expect(settings.getGeneratorTypes()).toEqual(storedSettings.generator_types);
        expect(settings.getExceptionsList()).toEqual(storedSettings.exceptions_list);
        expect(settings.isLoaded()).toEqual(true);
      })
  });

  it('settings loading with error rejects promise', (): Promise<void> => {
    expect.assertions(3);

    const storageMock = new class implements Services.Storage {
      clear(): Promise<void> {
        return new Promise((): void => {
          // do nothing
        });
      }

      get(key: string): Promise<{ [key: string]: any }> {
        return new Promise((resolve: Function, reject: Function): void => {
          reject(new Error('test error'))
        });
      }

      set(key: string, value: { [key: string]: any }): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }
    };

    const settings = new Settings(storageMock);

    expect(settings.isLoaded()).toEqual(false);

    return settings.load()
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test error');
        expect(settings.isLoaded()).toEqual(false);
      })
  });

  it('can save settings into storage', (): Promise<void> => {
    expect.assertions(13);

    const storageMock = new class implements Services.Storage {
      clear(): Promise<void> {
        return new Promise((): void => {
          // do nothing
        });
      }

      get(key: string): Promise<{ [key: string]: any }> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }

      set(key: string, value: { [key: string]: any }): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          expect(key).toEqual('extension_settings_v2');

          [
            'enabled',
            'useragent',
            'renew_enabled',
            'renew_interval',
            'renew_onstartup',
            'sync',
            'custom_useragent_enabled',
            'custom_useragent_value',
            'custom_useragent_list',
            'javascript_protection_enabled',
            'generator_types',
            'exceptions_list',
          ].forEach((requiredKey: string) => {
            expect(value).toHaveProperty(requiredKey);
          });

          resolve();
        });
      }
    };

    const settings = new Settings(storageMock);

    return settings.save()
  });

  it('settings saving with error rejects promise', (): Promise<void> => {
    expect.assertions(1);

    const storageMock = new class implements Services.Storage {
      clear(): Promise<void> {
        return new Promise((): void => {
          // do nothing
        });
      }

      get(key: string): Promise<{ [key: string]: any }> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }

      set(key: string, value: { [key: string]: any }): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          reject(new Error('test error'))
        });
      }
    };

    const settings = new Settings(storageMock);

    return settings.save()
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test error');
      })
  });

  it('can clear settings in storage', (): Promise<void> => {
    expect.assertions(1);

    const storageMock = new class implements Services.Storage {
      clear(): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          reject(new Error('test error')) // use error for future asserting
        });
      }

      get(key: string): Promise<{ [key: string]: any }> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }

      set(key: string, value: { [key: string]: any }): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
          // do nothing
        });
      }
    };

    const settings = new Settings(storageMock);

    return settings.clear()
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test error');
      })
  });

  it('method `setSynchronizationEnabled()` calls `setPreferSyncStorage()` on ChromeStorage only', (): void => {
    expect.assertions(1);

    class Foo extends ChromeStorage {
      public setPreferSyncStorage(prefer: boolean): void {
        expect(prefer).toEqual(true);
      }
    }

    const settings = new Settings(new Foo(true));

    settings.setSynchronizationEnabled(true);
  });

  it('ChromeStorage is used bt default (use global chrome object mocking for a test)', (): Promise<void> => {
    expect.assertions(1);

    // use `clear` method as most simple case
    const clear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {sync: {clear}}, runtime: {lastError: undefined}};

    const settings = new Settings;

    return settings.clear()
      .then(() => {
        expect(clear).toHaveBeenCalledWith(expect.any(Function));
      })
  });

  it('settings changes trigger handler function', (): void => {
    const handler = jest.fn();

    defaultSettings.setOnSettingsChanged(handler); // NOT trigger

    defaultSettings.getExceptionsList();
    defaultSettings.getCustomUserAgent();

    defaultSettings.setUserAgent(generateRandomString()); // trigger!
    defaultSettings.setCustomUserAgent(generateRandomString()); // trigger!

    expect(handler).toHaveBeenCalledTimes(2);
  })
});
